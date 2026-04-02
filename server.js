import app from "./src/app.js";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/config/db.js";
import errorHandler from "./src/middlewares/error.errorHandler.js";

import authRoutes from "./src/routes/auth.routes.js";
import skillRoutes from "./src/routes/skill.routes.js";
import enrollmentRoutes from "./src/routes/enrollment.routes.js";
import moduleRoutes from "./src/routes/module.routes.js";
import lessonRoutes from "./src/routes/lesson.routes.js";
import lessonProgressRoutes from "./src/routes/lessonProgress.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

const allowedOrigins = process.env.CORS_ORIGINS.split(",");

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // allows cookies to be sent in cross-origin requests
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api", enrollmentRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/progress", lessonProgressRoutes);
app.use("/api/profile", profileRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
