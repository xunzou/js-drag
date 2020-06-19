const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://10.110.30.12',
      ws: true,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api/ins/v2'
      },
    })
  );
};