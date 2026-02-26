import { registerService, loginService } from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const { username, emailId, password } = req.body;

    const user = await registerService(username, emailId, password);
    res.status(201).json({
      status: "success",
      message: "User created successfully!",
      data: {
        id: user._id,
        username: user.username,
        emailId: user.emailId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { emailId, password } = req.body;

    const token = await loginService(emailId, password);
    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};
