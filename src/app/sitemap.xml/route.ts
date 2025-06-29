import { NextResponse } from 'next/server';

export async function GET() {
  const urls = [
    {
      loc: 'https://rubinafragrance.com',
      changefreq: 'yearly',
      priority: 1.0,
    },
    {
      loc: 'https://rubinafragrance.com/about',
      changefreq: 'yearly',
      priority: 0.8,
    },
    {
      loc: 'https://rubinafragrance.com/blog',
      changefreq: 'yearly',
      priority: 0.5,
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
`
  )
  .join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
