import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  city: String,
  state: String,
  country: String,
  zip: String,
  products: [
    {
      title: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number,
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
