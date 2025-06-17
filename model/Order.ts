import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  name: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  products: {
    title: string;
    price: number;
    quantity: number;
    image: any;
  }[];
  total: number;
}

const orderSchema = new Schema<IOrder>(
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
        image: Schema.Types.Mixed, // Use Mixed if `image` varies in shape
      },
    ],
    total: Number,
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);
