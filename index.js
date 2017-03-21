var nodemon = require('nodemon');
var path = require('path');

var isProduction = process.env.NODE_ENV === 'production';

// We only want to run the workflow when not in production
// if (!isProduction) {

//   // We require the bundler inside the if block because
//   // it is only needed in a development environment.
//   var bundle = require('./bundler.js');
//   bundle();

// }

nodemon({
  exec: "babel-node",
  execMap: {
    js: 'babel-node'
  },
  script: path.join(__dirname, 'server/bin/www'),
  ignore: [],
  watch: !isProduction ? ['server/*'] : false,
  ext: 'js json'
}).on('restart', function() {
  console.log('Server restarted!');
});
