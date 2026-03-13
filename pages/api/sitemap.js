const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const albums = require('../../data/albums').default;

module.exports = async (req, res) => {
  const links = [
    { url: '/', priority: 1, changefreq: 'weekly' },
    ...albums.map(a => ({
      url: `/tehtud-tood/${a.slug}`,
      priority: 0.7,
      changefreq: 'monthly',
    })),
  ];

  const stream = new SitemapStream({ hostname: 'https://www.vannitubailusaks.ee' });
  const sitemap = await streamToPromise(Readable.from(links).pipe(stream));
  res.setHeader('Content-Type', 'text/xml');
  res.send(sitemap.toString());
}