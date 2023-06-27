const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoute");
const path = require("path");
const port = 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./netflix-ui/build")));

mongoose
  .connect("mongodb://127.0.0.1:27017/netflix", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connect");
  });

app.use("/api/user", userRoutes);

//rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./netflix-ui/build/index.html"));
});

app.listen(port, () => {
  console.log(`The server is running ${port}`);
});
