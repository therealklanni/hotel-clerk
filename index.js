'use strict'

const menubar = require('menubar')

const hotelClerk = menubar({
  index: 'http://localhost:2000',
  dir: __dirname + '/app',
  height: 300,
  width: 364,
  'node-integration': true,
  'preload-window': true
});

hotelClerk.on('after-create-window', function () {
  const html = hotelClerk.window.webContents;

  const updateLinks = function () {
    html.executeJavaScript(`
      var shell = require('shell');
      Array.prototype.forEach.call(document.links, (link) => {
        link.onclick = function (event) {
          event.preventDefault();
          // FIXME: Somehow the README target is not always an <a> element…
          var target = event.target;
          while (!target.href && target.parentElement) {
            target = target.parentElement;
          }
          if (target.href) {
            shell.openExternal(target.href);
          }
        };
      });
    `);
  };

  //html.openDevTools({mode: 'undocked'});

  html.on('dom-ready', updateLinks);
  html.on('did-get-response-details', updateLinks);

  html.on('will-navigate', function (event) {
    event.preventDefault();
  });
});
