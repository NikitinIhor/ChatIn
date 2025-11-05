import { refreshSession, signin, signout, signup } from "../services/auth.js";

export const signupController = async (req, res) => {
  const newUser = await signup(req.body);

  res.status(200).json({
    message: `Successfully registred user`,
    data: newUser,
  });
};

export const signinController = async (req, res) => {
  const userSession = await signin(req.body);

  const refreshTokenExpires = new Date(userSession.refreshTokenValidUntil);

  if (isNaN(refreshTokenExpires.getTime())) {
    return res.status(500).json({
      status: 500,
      message: "Invalid refresh token expiration date",
    });
  }

  res.cookie("refreshToken", userSession.refreshToken, {
    httpOnly: true,
    expires: refreshTokenExpires,
  });

  res.cookie("sessionId", userSession._id, {
    httpOnly: true,
    expires: refreshTokenExpires,
  });

  res.json({
    status: 200,
    message: "Seccessfuljy signed in",
    data: {
      accessToken: userSession.accessToken,
    },
  });
};

export const refreshController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;

  const userSession = await refreshSession({
    refreshToken,
    sessionId,
  });

  const refreshTokenExpiry = new Date(userSession.refreshTokenValidUntil);

  res.cookie("refreshToken", userSession.refreshToken, {
    httpOnly: true,
    expires: refreshTokenExpiry,
  });

  res.cookie("sessionId", userSession._id, {
    httpOnly: true,
    expires: refreshTokenExpiry,
  });

  res.json({
    status: 200,
    message: "Seccessfully refreshed",
    data: {
      accessToken: userSession.accessToken,
    },
  });
};

export const signoutController = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await signout(sessionId);
  }

  res.clearCookie("sessionId");
  res.clearCookie("refreshToken");

  res.status(204).send();
};
