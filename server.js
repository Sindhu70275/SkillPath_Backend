import app from "./src/app.js";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/config/db.js";
import errorHandler from "./src/middlewares/error.errorHandler.js";

import authRoutes from "./src/routes/auth.routes.js";
import skillRoutes from "./src/routes/skill.routes.js";
import enrollmentRoutes from "./src/routes/enrollment.routes.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

const allowedOrigins = process.env.CORS_ORIGINS.split(",");

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api", enrollmentRoutes);

app.use(errorHandler);
