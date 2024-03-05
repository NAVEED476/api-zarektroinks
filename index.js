const express = require("express");
const cors = require("cors");
const path = require('path');
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
// Serve static files with correct MIME types
app.use(
  express.static(path.join(__dirname, "public"), {
    // Set custom MIME types
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".js")) {
        res.set("Content-Type", "application/javascript");
      }
    },
  })
);
app.use(express.json());
app.use(cors());
app.use("/api/auth", userRouter);
app.listen(5000, () => {
  console.log("port is running at 5000");
});
