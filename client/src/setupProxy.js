const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    ['/api', '/auth/google'],
    createProxyMiddleware({
      target: 'http://localhost:3002',
      changeOrigin: true,
      proxyTimeout: 60000,
    })
  );
};
