const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { GlideClient } = require('@valkey/valkey-glide');
let valkeyClient = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
  } else {
    win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.handle('valkey-connect', async (event, connectionDetails) => {
  try {
    valkeyClient = await GlideClient.createClient({
      addresses: [{
        host: connectionDetails.host,
        port: connectionDetails.port
      }]
    });
    return {success: true};
  } catch (error) {
    console.error('Failed to connect to Valkey:', error);
    return {success: false, error: error.message};
  }
})