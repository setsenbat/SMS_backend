const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const app = express();

//Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());

app.use(logger);
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//Routes
app.use("/", require("./routes/api/users"));
app.use("/", require("./routes/api/qpay"));
app.use("/", require("./routes/api/msal"));
app.disable("etag");

var connectionParameter = "mongodb://localhost:27017/sms";
var connectionParameter1 = "mongodb://localhost:27017/sms";

//Connect to Mongoose
mongoose
  .connect(connectionParameter, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
  })
  .then(() => {
    console.log(
      `MongoDB connected on ${connectionParameter.substring(10, 15)}`
    );
    // console.log(process.env)
    // console.log(process.env.EDGE_USE_CORECLR)
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
    console.log(
      "First DB connection attempt unsuccessful on: ",
      connectionParameter,
      ", trying next on: ",
      connectionParameter1
    );
    // Handling connection errors
    // Connect to replica
    mongoose
      .connect(connectionParameter1, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(
          `MongoDB connected on ${connectionParameter1.substring(10, 15)}`
        );
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
      })
      .catch((err) => {
        console.log(err);
        console.log("End orj irj bga 2");
        // Handling connection errors
        // Connect to replica
      });
  });

//Server, port, eniig hooson bga port haigaad ashiglaad avdag baival yaaj bn
const PORT = process.env.PORT || 5557;
