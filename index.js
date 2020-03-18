'use strict'

const { app, shell, Menu, Tray } = require('electron');
const path = require('path');
const { menubar } = require('menubar');

const iconPath = path.join(__dirname, 'app', 'IconTemplate.png');

app.on('ready', () => {
  const tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Quit', role: 'quit', click: () => app.exit() },
  ]);
  tray.addListener('right-click', () => tray.popUpContextMenu(contextMenu))
  
  const hotelClerk = menubar({
    tray,
    index: 'http://localhost:2000',
    browserWindow: {
      width: 350,
      height: 350,
    },
    preloadWindow: true,
  });

  hotelClerk.on('after-create-window', function () {
    const webContents = hotelClerk.window.webContents;

    const handleRedirect = (e, url) => {
      if (url != webContents.getURL()) {
        e.preventDefault()
        shell.openExternal(url)
      }
    };
    
    webContents.on('will-navigate', handleRedirect);
    webContents.on('new-window', handleRedirect);
  });
});