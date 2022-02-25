const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find().select("-passwordHash");
  if (!users) res.status(500).json({ success: false });
  res.status(200).send(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");
  if (!user)
    return res.status(404).json({ success: false, message: "User not found." });

  res.status(200).send(user);
});

router.post("/register", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartament: req.body.apartament,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
  });

  user = await user.save();
  if (!user)
    return res
      .status(500)
      .json({ success: false, message: "The user not created." });

  res.status(200).send(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(404).json({ success: false, message: "User not found." });

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({
      success: false,
      message: "User authenticated.",
      user: { name: user.name, email: user.email, token: token },
    });
  } else {
    return res.status(200).json({ success: false, message: "User is wrong." });
  }
});

exports.routerUser = router;
