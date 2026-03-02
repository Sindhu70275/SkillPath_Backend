import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const payload = {
    id: user._id,
    role: user.role,
    name: user.username,
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const createUserData = (user) => {
  return {
    id: user._id,
    username: user.username,
    emailId: user.emailId,
    role: user.role,
  };
};
