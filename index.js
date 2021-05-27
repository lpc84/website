const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const path = require('path');

// Render your site
const renderIndex = (req, res) => {
    res.sendFile(path.resolve(__dirname, '_site/www/members/index.html'));
  }
  app.get('/membros', renderIndex);

app.use('/*', createProxyMiddleware({ target: 'http://localhost:2368', changeOrigin: true }));



app.listen(3000);