const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const docs = require("./docs");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
//console.log(swagger)
const noticeRouter = require("./routes/api/noticesRoute");
const userRouter = require("./routes/api/authRoute");
const petRouter = require("./routes/api/petRoute");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/api/notices", noticeRouter);
app.use("/api/users", userRouter);
app.use("/api/pet", petRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(docs));

// console.log(process.env.SERVER_URL);
app.all("*", (_, res) => {
  res.status(404).json({
    message: "Oops! Resource not found..",
  });
});

app.use((err, _, res, __) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = app;
