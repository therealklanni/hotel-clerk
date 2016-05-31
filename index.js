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

  html.on('will-navigate', function (event, url) {
    event.preventDefault();
    require('shell').openExternal(url);
  });

  /*
  const debugEvent = function (name) {
    html.on(name, function () {
      console.info(name);
    })
  };

  debugEvent('did-finish-load');
  debugEvent('did-fail-load');
  debugEvent('did-frame-finish-load');
  debugEvent('did-start-loading');
  debugEvent('did-stop-loading');
  debugEvent('did-get-response-details');
  debugEvent('did-get-redirect-request');
  debugEvent('dom-ready');
  debugEvent('page-favicon-updated');
  debugEvent('new-window');
  debugEvent('will-navigate');
  debugEvent('did-navigate');
  debugEvent('did-navigate-in-page');
  debugEvent('crashed');
  debugEvent('plugin-crashed');
  debugEvent('destroyed');
  debugEvent('devtools-opened');
  debugEvent('devtools-closed');
  debugEvent('devtools-focused');
  debugEvent('certificate-error');
  debugEvent('select-client-certificate');
  debugEvent('login');
  debugEvent('found-in-page');
  debugEvent('media-started-playing');
  debugEvent('media-paused');
  debugEvent('did-change-theme-color');
  debugEvent('cursor-changed');
  debugEvent('context-menu');

  html.openDevTools({mode: 'undocked'});
  */
});
