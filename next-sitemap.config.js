/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nurettin-dincer.vercel.app/',
  generateRobotsTxt: true, // robots.txt dosyasını otomatik oluşturur
  sitemapSize: 7000,
  exclude: ['/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
