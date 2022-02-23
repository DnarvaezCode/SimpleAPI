const express = require("express");
const { User } = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  if (!users) res.status(500).json({ success: false });
  res.status(200).send(users);
});

router.post("/", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: req.body.passwordHash,
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

exports.routerUser = router;
