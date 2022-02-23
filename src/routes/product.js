const express = require("express");
const { default: mongoose } = require("mongoose");
const { Categorie } = require("../models/categorie");
const router = express.Router();
const Product = require("../models/product");

router.get("/", async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  const products = await Product.find(filter).populate([
    { path: "category", select: "name status" },
    { path: "brand", select: "name" },
  ]); //.select("name image -_id");
  if (!products) res.status(500).json({ success: false });
  res.status(200).send(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product)
    return res
      .status(404)
      .json({ success: false, message: "Product not found." });

  res.status(200).send(product);
});

router.post("/", async (req, res) => {
  const categorie = Categorie.findById(req.body.category);
  if (!categorie)
    return res
      .status(400)
      .json({ success: false, message: "Invalid category." });

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    rickDescription: req.body.rickDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    inStock: req.body.inStock,
    rating: req.body.rating,
    isFeatured: req.body.isFeatured,
  });

  product = await product.save();
  if (!product)
    return res
      .status(500)
      .json({ success: false, message: "The product cannot be created." });
  res.status(200).send(product);
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res
      .status(400)
      .json({ success: false, message: "Invalid product id." });

  const categorie = Categorie.findById(req.body.category);
  if (!categorie)
    return res
      .status(400)
      .json({ success: false, message: "Invalid category." });

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      rickDescription: req.body.rickDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      inStock: req.body.inStock,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );

  if (!product)
    return res
      .status(500)
      .json({ success: false, message: "The product cannot updated." });
  res.status(200).send(product);
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (!product)
        return res
          .status(404)
          .json({ success: false, message: "Product not found." });
      return res
        .status(200)
        .json({ success: true, message: "Product deleted." });
    })
    .catch((error) => res.status(500).json({ error, success: false }));
});

router.get("/get/count", async (req, res) => {
  const productCount = await Product.countDocuments();
  if (!productCount)
    return res
      .status(500)
      .json({ success: false, message: "Product not count." });

  res.status(200).send({ productCount: productCount });
});

router.get("/get/feature/:count", async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  if (count == "0") return res.status(400).send("Debe de ingresar al menos 1");
  const product = await Product.find({ isFeatured: true }).limit(count);
  if (!product)
    return res
      .status(500)
      .json({ success: false, message: "Product not found." });

  res.status(200).send({ data: product });
});

exports.routerProduct = router;
