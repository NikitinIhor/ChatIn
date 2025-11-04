import { signin, signup } from "../services/auth.js";

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

  res.cookie("sessionID", userSession._id, {
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
