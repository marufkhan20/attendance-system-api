const express = require("express");
const bcrypt = require("bcryptjs");
const connectDB = require("./db");
const User = require("./models/User");
const app = express();

app.use(express.json());

app.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid Data!!" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hash });
    await user.save();

    res.status(201).json({ message: "User created successfully!", user });
  } catch (err) {
    next(err);
  }
});

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Invalid Data" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credential!!" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid Credential" });
    }

    res.status(200).json({ message: "Login Successfull" });
  } catch (err) {
    next(err);
  }
});

app.get("/", (req, res) => {
  res.send("Thank you for your request");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Server error occurred!!" });
});

connectDB("mongodb://localhost:27017/attendance-db")
  .then(() => {
    console.log("Database Connected...");
    app.listen(4000, () => {
      console.log("I am listening port on 4000");
    });
  })
  .catch((err) => console.log(err));
