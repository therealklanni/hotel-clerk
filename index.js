'use strict'

var menubar = require('menubar')
var hotelClerk = menubar({
  index: 'http://localhost:2000',
  dir: __dirname + '/app',
  'node-integration': false,
  height: 300,
  width: 364
})
