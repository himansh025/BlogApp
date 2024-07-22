import express, { json } from "express";
import bcrypt from "bcrypt";
import { createtoken } from "../services/auth.js";
import { User } from "../models/user.model.js";

  const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

// Handle POST request for user signup
router.post("/signup", async (req, res) => {
  try {
    const { FullName, email, password } = req.body;

    if (!FullName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ FullName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).render("login");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.render("login", {
        error: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.render("login", {
        error: "Invalid password",
      });
    }
user.password="";
    const token = createtoken(user);
    res.status(200).cookie("token", token).render("home", { user });
  } catch (err) {
    console.error(err);
    res.render("login", {
      error: "Server error, please try again later",
    });
  }
});


router.get("/signin", (req, res) => {
  res.render("login");
});


router.get("/logout",(req,res)=>{
  res.clearCookie("token").render("login")
})

export default router;
