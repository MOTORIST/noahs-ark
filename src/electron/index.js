// eslint-disable-next-line import/no-extraneous-dependencies
import { app, BrowserWindow } from 'electron';
import path from 'path';

let win;

function createWindow() {
  const icon = path.join(app.getAppPath(), 'icons', 'icon-512.png');

  win = new BrowserWindow({
    show: false,
    icon,
    backgroundColor: '#cfd0cf',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const pathHtmlFile = path.resolve(
    app.getAppPath(),
    'public',
    'web',
    'index.html'
  );

  win.loadFile(pathHtmlFile);
  win.maximize();
  win.show();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
