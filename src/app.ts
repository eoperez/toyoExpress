// Place holder for Electron main process.
import {app, BrowserWindow} from 'electron';
let mainView: BrowserWindow

app.on('ready', () => {
    mainView = new BrowserWindow({
        width: 1024,
        height: 768,
    });

    mainView.loadURL('file://' + __dirname + '/views/mainView.html');
    mainView.webContents.openDevTools();
});