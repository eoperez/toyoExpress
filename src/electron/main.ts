import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import {Data} from './services/database';

let mainWindow: Electron.BrowserWindow;
// TODO: This should be moved to a properties file
const dataDir = './data';
const dbfileName = 'dms.db';
const dbLocation: string = dataDir + '/' + dbfileName;

const data  = new Data(dbLocation);

fs.stat(dbLocation, (error) => {
    if (error) {
        console.log('Database file not found in: ' + dbLocation + ', creating database');
        // does not extis do something to create the db file
        fs.mkdirSync(dataDir);
        data.createDmsDB(dbLocation);
        data.updateSchema();
    } else {
        console.log('Database data base found in' + dbLocation);
        // files does exisits
        data.updateSchema();
    }
});

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../frontEndApp/index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
