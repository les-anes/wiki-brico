import "./validate-data.mjs";
import { writeFile } from "node:fs/promises";
// No invented deployment URL: configure SITE_URL when deploying.
if (process.env.SITE_URL) {
  const url = new URL(process.env.SITE_URL);
  if (!["https:", "http:"].includes(url.protocol))
    throw new Error("SITE_URL doit être une URL HTTP(S).");
  const base = url.origin;
  await writeFile(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`,
  );
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${base}/</loc></url></urlset>\n`,
  );
} else {
  await writeFile("dist/robots.txt", "User-agent: *\nAllow: /\n");
  console.log("SITE_URL non défini : sitemap omis.");
}
