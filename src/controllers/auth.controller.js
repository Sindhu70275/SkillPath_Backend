import {
  refreshTokenService,
  registerService,
  loginService,
} from "../services/auth.service.js";

export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    const newAccesstoken = await refreshTokenService(token);
    res.status(200).json({
      status: "success",
      message: "Token aquired silently!",
      data: {
        accessToken: newAccesstoken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { fullName, emailId, password } = req.body;

    const { userData, token } = await registerService(
      fullName,
      emailId,
      password,
    );
    res.status(201).json({
      status: "success",
      message: "User created successfully!",
      data: {
        user: userData,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { emailId, password } = req.body;

    const { userData, token, refreshToken } = await loginService(
      emailId,
      password,
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      status: "success",
      message: "Login successful!",
      data: {
        user: userData,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
