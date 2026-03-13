
module.exports = {
reactStrictMode: true,
images: {
  deviceSizes: [320, 420, 768, 1024, 1200],
  loader: "default",
},
async rewrites() {
  return [
    {
      source: "/sitemap.xml",
      destination: "/api/sitemap" 
    },
  ]
},
}