import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  houseNumber:String,
  address: String,
  city: String,
  state: String,
  country: String,
  zip: String,
  products: [
    {
      _id:String,
      title: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number,
  trackingId: String,
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
