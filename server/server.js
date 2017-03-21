var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var webpack = require("webpack");
var webpackMiddleware = require("webpack-dev-middleware");

var proxy = httpProxy.createProxyServer();
var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var host = process.env.APP_HOST || 'localhost';
var port = isProduction ? 8080 : 3000;
var publicPath = path.resolve(__dirname, '..', 'public');
var compiler = require('../webpack.config');

if (!isProduction) {
  app.use(webpackMiddleware(webpack(compiler), {
    // publicPath is required, whereas all other options are optional

    noInfo: false,
    // display no info to console (only warnings and errors)

    quiet: false,
    // display nothing to the console

    lazy: false,
    // switch into lazy mode
    // that means no watching, but recompilation on every request

    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    // watch options (only lazy: false)

    publicPath: "/assets/",
    // public path to bind the middleware to
    // use the same as in webpack

    index: "index.html",
    // the index path for web server

    headers: { "X-Custom-Header": "yes" },
    // custom headers

    stats: {
      colors: true
    },
    // options for formating the statistics

    reporter: null,
    // Provide a custom reporter to change the way how logs are shown.

    serverSideRender: false,
    // Turn off the server-side rendering mode. See Server-Side Rendering part for more info.
  }));
}

app.use(express.static(publicPath));

// place your handlers here

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(publicPath, 'index.html'));
// });

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function (e) {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function () {
  console.log('Server running on port ' + port);
});