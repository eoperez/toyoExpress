import { app, BrowserWindow, session, ipcMain, IpcMessageEvent } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import {Data} from './services/database';
import { userInfo } from 'os';


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
  const activeSession = session.defaultSession;
  data.getSettings().then((results) => {
    for (const key in results) {
      if (results.hasOwnProperty(key)) {
        console.log('creating cookie: ' + key + ' with value: ' + results[key]);
        activeSession.cookies.set({url: '*', name: key, value: results[key]}, (cookieError) => {
          if (cookieError) {
            throw new Error('Error setting the cookies' + cookieError);
          }
        });
      }
    }
  });
  activeSession.cookies.set({url: '*', name: 'hasSession', value: 'false'}, (cookieError) => {
    if (cookieError) {
      throw new Error('Error setting default user session: ' + cookieError);
    }
  });
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

// listeners.

ipcMain.on('signIn', (event: IpcMessageEvent, credentials) => {
  // TODO: DB service should check for users within credentials
  // in case of match should update session Cookie and send back signed true otherwise false.
  console.log('User: ' + credentials.user + ' is making a sign in attempt.');
  data.getUser(credentials.user).then((user) => {
    let isSigned: boolean;
    if (credentials.pwd === user.pass) {
      const activeSession = session.defaultSession;
      console.log('Main process is getting user: ', user);
      isSigned = true;
      user.hasSession = true;
      for (const attribute in user) {
        if (user.hasOwnProperty(attribute)) {
          activeSession.cookies.set({url: '*', name: attribute, value: user[attribute]}, (cookieError) => {
            if (cookieError) {
              throw new Error('Error setting the cookies' + cookieError);
            }
          });
        }
      }
    } else {
      isSigned = false;
    }
    event.sender.send('signedIn', isSigned);
  });
});
