const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productNo: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    rawData: {
      type: mongoose.Schema.Types.Mixed,
    },
    epData: {
      type: mongoose.Schema.Types.Mixed,
    },
    departureDate: {
      type: Date,
    },
    arrivalDate: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('Product', productSchema);
