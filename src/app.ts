// Place holder for Electron main process.
import {app, BrowserWindow} from 'electron';
import * as fs from 'fs';
import {Data} from './services/database';

let mainView: BrowserWindow
//TODO: This should be moved to a properties file
const dataDir: string = './data';
const dbfileName: string = 'dms.db';
const dbLocation: string = dataDir + '/' + dbfileName;

var data  = new Data(dbLocation);

fs.stat(dbLocation, (error) => {
    if(error) {
        console.log('Database file not found in: '+ dbLocation +', creating database');
        // does not extis do something to create the db file
        fs.mkdirSync(dataDir);
        data.createDmsDB(dbLocation);
    } 
    else {
        console.log('Database data base found in' + dbLocation);
        // files does exisits 
        
    }
 
});

app.on('ready', () => {
    mainView = new BrowserWindow({
        width: 1024,
        height: 768,
    });

    mainView.loadURL('file://' + __dirname + '/views/mainView.html');
    mainView.webContents.openDevTools();
});