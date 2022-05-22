const mongoose = require('mongoose');

const billSchema = new mongoose.Schema(
  {
    billItems: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
        quantity: { type: String, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Bill', billSchema);