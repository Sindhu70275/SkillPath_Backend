import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import errorHandler from "./src/middleware/errorHandler.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;
console.log(`PORT: ${PORT}`);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
