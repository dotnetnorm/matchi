// This file configures a web server for testing the production build
// on your local machine.

var browserSync = require('browser-sync');

// Run Browsersync
browserSync({
  port: 3010,
  ui: {
    port: 3011
  },
  server: {
    baseDir: 'dist'
  },

  files: [
    'src/*.html'
  ]
});
