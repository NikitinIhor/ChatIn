import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import createHttpError from "http-errors";
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from "../constants/user.js";
import { SessionCollection } from "../db/models/Session.js";
import UserCollection from "../db/models/User.js";

export const signup = async (payload) => {
  const { email } = payload;

  const user = await UserCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, `Email allready exists`);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const data = await UserCollection.create({
    ...payload,
    password: hashPassword,
  });

  delete data._doc.password;

  return data._doc;
};
// -----------------------------------------------------------

export const signin = async (payload) => {
  const { email, password } = payload;

  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, `Email is invalid`);
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, `Password is invalid`);
  }

  await SessionCollection.deleteOne({ userID: user._id });

  const accessToken = randomBytes(30).toString("base64");
  const refreshToken = randomBytes(30).toString("base64");
  const accessTokenValidUntil = new Date(Date.now() + accessTokenLifeTime);
  const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifeTime);

  const userSession = await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return userSession;
};
// -----------------------------------------------------------

export const findSessionByAccessToken = (accessToken) =>
  SessionCollection.findOne({ accessToken });
// -----------------------------------------------------------

export const findUser = (filter) => UserCollection.findOne(filter);
// -----------------------------------------------------------

export const refreshSession = async ({ refreshToken, sessionID }) => {
  const session = await SessionCollection.findOne({
    _id: sessionID,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, "session not found");
  }

  if (new Date() > session.refreshTokenValidUntil) {
    throw createHttpError(401, "session token expired");
  }

  await SessionCollection.deleteOne({ _id: sessionID });

  const sessionData = createSession();

  const userSession = await SessionCollection.create({
    userID: session._id,
    ...sessionData,
  });

  return userSession;
};
// -----------------------------------------------------------
