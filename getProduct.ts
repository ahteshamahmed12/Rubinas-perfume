// lib/getProduct.ts
import { client } from '@/sanity/lib/client';

export async function getProduct(id: string) {
  const query = `*[_type == "product" && _id == $id][0]`;
  const product = await client.fetch(query, { id });
  return product;
}