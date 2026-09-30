export default async function sitemap() {
  const baseUrl = 'https://vexornull-downloader.vercel.app';
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
  ];
}
