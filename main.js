const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const lad = require("./controllers/LadonObject");
const nodeConsole = require('console');
const myConsole = new nodeConsole.Console(process.stdout, process.stderr);
let mainWindow;
global.ld = null;

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
  console.log('Action Run ', argv.ld);
});

ipc.on('new_script',(event, argv) => {

  //probleme de passations de variables
  global.ld = new lad(argv).ld;
//  let dialogWindow ;


  let createDialog = () => {
    global.dialogWindow = new BrowserWindow({width: 640, height: 480});
    global.dialogWindow.loadURL(`file://${__dirname}/views/box_template.htm`);

  }
  createDialog();

  global.dialogWindow.on('closed' ,() => {
    global.dialogWindow = null;
  });

});

ipc.on('box_response', (event, argv) => {
  if(global.dialogWindow && global.dialogWindow.destroy() !== undefined) global.dialogWindow.destroy();

  mainWindow.loadURL(`file://${__dirname}/views/ladon_template.htm`);
  //createWindow();
});
ipc.on('box_stop', () => {
  global.dialogWindow.destroy();
});
