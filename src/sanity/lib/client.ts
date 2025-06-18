// sanity/lib/client.ts
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: '2024-06-01',
  useCdn: false, // false if using token
  token: process.env.SANITY_API_TOKEN, // Add this!
});
