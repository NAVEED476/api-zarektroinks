const express = require("express");
const cors = require("cors")
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./Routes/UserRoutes");
const app = express();


dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("db connection is successful");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use(cors());
app.use("/api/auth", userRouter);
app.listen(5000, () => {
  console.log("port is running at 5000");
});
