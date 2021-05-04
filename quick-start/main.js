const path = require('path')
const { app, BrowserWindow } = require('electron')
// const imagemin = require('imagemin')
// import { path } from 'path'
// import * as path from 'path'
// import { app, BrowserWindow } from 'electron'

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
            // preload: 'C:\\Users\\Alexey\\source\\repos\\_js\\hello-electron\\quick-start\\preload.js'
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})