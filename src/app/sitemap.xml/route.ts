import { NextResponse } from 'next/server';

export async function GET() {
  // 🔁 Your dynamic product slugs — replace with real ones or fetch from DB
  const products = [
    "rose-musk",
    "oud-amber",
    "white-musk",
    "oud-intense",
    "arabian-night"
  ];

  // ✅ Static pages
  const staticUrls = [
    {
      loc: 'https://rubinafragrance.com',
      changefreq: 'yearly',
      priority: 1.0,
    },
    {
      loc: 'https://rubinafragrance.com/Shop',
      changefreq: 'yearly',
      priority: 1.0,
    },
    {
      loc: 'https://rubinafragrance.com/AboutUs',
      changefreq: 'yearly',
      priority: 0.8,
    },
    {
      loc: 'https://rubinafragrance.com/checkout',
      changefreq: 'yearly',
      priority: 0.8,
    },
    {
      loc: 'https://rubinafragrance.com/cart',
      changefreq: 'yearly',
      priority: 0.8,
    },
    {
      loc: 'https://rubinafragrance.com/aboutus',
      changefreq: 'yearly',
      priority: 0.8,
    },
    {
      loc: 'https://rubinafragrance.com/contactus',
      changefreq: 'yearly',
      priority: 0.5,
    },
  ];

  // ✅ Dynamic product URLs
  const productUrls = products.map((slug) => ({
    loc: `https://rubinafragrance.com/Product/${slug}`,
    changefreq: 'monthly',
    priority: 0.9,
  }));

  const allUrls = [...staticUrls, ...productUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `
  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
  )
  .join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
