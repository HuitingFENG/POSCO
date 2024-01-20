const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Specify the API endpoint you want to proxy
    createProxyMiddleware({
      target: 'https://impactco2.fr', // The target URL of the external API
      changeOrigin: true, // Enable this option for change of origin
    })
  );
};
