const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

let mainWindow;

let createWindow = () => {
  mainWindow = new BrowserWindow({width: 640, height: 480});
  mainWindow.loadURL(`file://${__dirname}/views/ladon_template.htm`);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.on('widow-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
})

ipc.on('action_run', (event, argv) => {
  //console.log('Action Run ', argv.ld);
});
