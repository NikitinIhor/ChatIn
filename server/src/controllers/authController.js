import { signup } from "../services/auth.js";

export const signupController = async (req, res) => {
  const newUser = await signup(req.body);

  res.status(200).json({
    message: `Successfully registred user`,
    data: newUser,
  });
};
