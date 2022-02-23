const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

exports.Categorie = mongoose.model("Category", categorySchema);
