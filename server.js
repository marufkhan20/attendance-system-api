const express = require("express");
const connectDB = require("./db");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  res.send("Thank you for your request");
});

app.use((err, req, res, next) => {
  console.log(err);
  const message = err.message ? err.message : "Server error occurred!!";
  const status = err.status ? err.status : 500;

  res.status(status).json({ message });
});

connectDB("mongodb://localhost:27017/attendance-db")
  .then(() => {
    console.log("Database Connected...");
    app.listen(4000, () => {
      console.log("I am listening port on 4000");
    });
  })
  .catch((err) => console.log(err));
