// sanity/lib/client.ts
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-06-01',
  useCdn: false, // false if using token
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // Add this!
});
