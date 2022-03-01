const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

exports.OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);
