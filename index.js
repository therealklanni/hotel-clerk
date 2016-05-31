'use strict'

const menubar = require('menubar')

const hotelClerk = menubar({
  index: 'http://localhost:2000',
  dir: __dirname + '/app',
  height: 300,
  width: 364,
  'preload-window': true
});

hotelClerk.on('after-create-window', function () {
  const html = hotelClerk.window.webContents;

  html.on('will-navigate', function (event, url) {
    event.preventDefault();
    require('shell').openExternal(url);
  });
});
