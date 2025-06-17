// models/Order.ts
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    country: String,
    state: String,
    city: String,
    zip: String,
    products: [
      {
        title: String,
        price: Number,
        quantity: Number,
        image: Object,
      },
    ],
    total: Number,
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
