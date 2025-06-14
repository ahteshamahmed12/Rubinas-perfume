import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "lkawe9k2",
  dataset: "production",
  apiVersion: "2023-06-01",
  useCdn: false, // important for writes
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // store it in .env
});
