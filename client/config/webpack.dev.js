const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  devServer: {
    proxy: [{
      path: '/api',
      target: 'http://localhost:4000'
    },{
      path: '/login',
      target: 'http://localhost:4000'
    },{
      path: '/metal',
      target: 'http://localhost:4000'
    },{
      path: '/homebridge',
      target: 'http://localhost:4000'
    },{
      path: '/homebridgeplugin',
      target: 'http://localhost:4000'
    },{
      path: '/npm',
      target: 'http://localhost:4000'
    },{
      path: '/socket.io',
      target: 'http://localhost:4000'
    }]
  }
});
