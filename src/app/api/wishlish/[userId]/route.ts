import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../../db";
import Wishlist from "../../../../../model/Wishlist";
import Product from "../../../../../model/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { userId },
    method,
  } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const wishlist = await Wishlist.findOne({ userId }).populate('products');
        res.status(200).json(wishlist || { products: [] });
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch wishlist" });
      }
      break;

    case 'POST':
      try {
        const { productId } = req.body;
        if (!productId) return res.status(400).json({ error: "productId required" });

        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
          wishlist = await Wishlist.create({ userId, products: [productId] });
        } else if (!wishlist.products.includes(productId)) {
          wishlist.products.push(productId);
          await wishlist.save();
        }

        res.status(200).json({ message: "Added to wishlist", wishlist });
      } catch (error) {
        res.status(500).json({ error: "Failed to add product" });
      }
      break;

    case 'DELETE':
      try {
        const { productId } = req.body;
        if (!productId) return res.status(400).json({ error: "productId required" });

        const wishlist = await Wishlist.findOneAndUpdate(
          { userId },
          { $pull: { products: productId } },
          { new: true }
        );

        res.status(200).json({ message: "Removed from wishlist", wishlist });
      } catch (error) {
        res.status(500).json({ error: "Failed to remove product" });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
