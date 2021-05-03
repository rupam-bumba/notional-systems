//express
const express = require("express");
const app = express();
//path
const path = require("path");

//dotenv
require("dotenv").config({ path: ".env" });

// console.log(process.env);
console.log("The value of PORT is by env:", process.env.PORT);

//database
mongoose = require("mongoose");
mongoose.pluralize(null);
mongoose
  .connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(
      "Mongo DB Connection Established " + "\n" + "DB Connected........"
    );
  })
  .catch((errors) => {
    console.log(" Connection Establishment error \n DB NOT Connected...");
    console.log(errors);
  });

app.use("/api", require("./api/routes/user"));

// Serve Public static files
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.status(200).json({
    mag: "mechin test api",
  });
});

//error handeller
app.use((req, res, next) => {
  const error = new Error("Path Not found please read the docs");
  error.status = 404;
  next(error);
});

// error handeller
app.use((error, req, res, next) => {
  console.log("[ERROR HANDELLER]\t" + error);
  res.status(error.status || 500).json({
    error: {
      massage: error.message,
    },
  });
});

module.exports = app;
