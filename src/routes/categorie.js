const express = require("express");
const { Categorie } = require("../models/categorie");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Categorie.find();
  if (!categories) res.status(500).json({ success: false });
  res.status(200).send(categories);
});

router.post("/", async (req, res) => {
  let categorie = new Categorie({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  categorie = await categorie.save();
  if (!categorie)
    return res
      .status(500)
      .json({ success: false, message: "The categorie not created." });

  res.send(categorie);
});

router.delete("/:id", (req, res) => {
  Categorie.findByIdAndDelete(req.params.id)
    .then((categorie) => {
      if (!categorie)
        return res
          .status(404)
          .json({ success: false, message: "Categorie not found." });
      return res
        .status(200)
        .json({ success: true, message: "Categorie deleted." });
    })
    .catch((error) => res.status(500).json({ error, success: false }));
});

router.get("/:id", async (req, res) => {
  const categorie = await Categorie.findById(req.params.id);
  if (!categorie)
    return res
      .status(404)
      .json({ success: false, message: "Caregorie not found." });

  res.status(200).send(categorie);
});

router.put("/:id", async (req, res) => {
  const categorie = await Categorie.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );

  if (!categorie)
    return res
      .status(400)
      .json({ success: false, message: "Caregorie cannot be updated." });

  res.status(200).send(categorie);
});

exports.routerCategorie = router;
