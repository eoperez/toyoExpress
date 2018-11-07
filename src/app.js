"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var mainView;
electron_1.app.on('ready', function () {
    mainView = new electron_1.BrowserWindow({
        width: 1024,
        height: 768,
    });
    mainView.loadURL('file://' + __dirname + '/views/mainView.html');
    mainView.webContents.openDevTools();
});
