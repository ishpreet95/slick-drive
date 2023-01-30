const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const port = 3000;

const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize
  .sync({ force: true })
  // .sync()
  .then(() => {
    console.log("Synced db");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
