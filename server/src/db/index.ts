import mongoose from "mongoose";
import { MONGO_URI } from "#/utils/variables";

mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("DB connected successfully!");
  })
  .catch((err) => {
    console.log("DB connection failed..." + err);
  });
