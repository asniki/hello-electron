const path = require('path')
const os = require('os')
const { app, BrowserWindow, Menu, globalShortcut, ipcMain } = require('electron')

// const imagemin = require('imagemin')
// const imageminMozjpeg = require('imagemin-mozjpeg')
// const imageminPngquant = require('imagemin-pngquant')
//const slash = require('slash')

// import { path } from 'path'
// import { os } from 'os'
// import { app, BrowserWindow, Menu, globalShortcut, ipcMain } from 'electron'
// import {imagemin} from 'imagemin'

// Set env
process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production'
const isMac = process.platform === 'darwin'

let mainWindow
let aboutWindow

function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'ImageShrink',
        width: isDev ? 1200 : 500,
        height: 600,
        icon: './assets/icons/Icon_256x256.png',
        resizable: isDev ? true : false,
        backgroundColor: 'white',
        webPreferences: {
            // nodeIntegration: true,           // - без preload
            // contextIsolation: false,         // - без preload
            // enableRemoteModule: true,
            preload: path.join(__dirname, 'app/preload.js')
        },
    })

    if (isDev) {
        mainWindow.webContents.openDevTools()
    }

    // mainWindow.loadURL('http://google.com')
    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    mainWindow.loadFile('./app/index.html')
}

function createAboutWindow() {
    aboutWindow = new BrowserWindow({
        title: 'About ImageShrink',
        width: 300,
        height: 300,
        icon: './assets/icons/Icon_256x256.png',
        resizable: false,
        backgroundColor: 'white',
    })

    aboutWindow.loadFile('./app/about.html')
}

//app.on('ready', createMainWindow)

app.whenReady().then(() => {
    createMainWindow()

    // set menu
    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

    // set global shortcuts
    // globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload())
    // globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () => mainWindow.toggleDevTools())

    // garbage collecting
    mainWindow.on('ready', () => mainWindow = null)

    // for macOS
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })
})

app.on('window-all-closed', () => {
    // for macOS
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


//menu template
const menu = [
    // ...(isMac ? [{ role: 'appMenu' }] : []),
    ...(isMac ? [{
        label: app.name,
        submenu: [
            {
                label: 'About',
                click: createAboutWindow,
            },
        ]
    }] : []),
    {
        role: 'fileMenu'

        // label: 'File',
        // submenu: [
        //     {
        //         label: 'Quit',
        //         // accelerator: isMac ? 'Command+W' : 'Ctrl+W',
        //         accelerator: 'CmdOrCtrl+W',
        //         click: () => app.quit()
        //     }
        // ]
    },
    ...(isDev ? [
        {
            label: 'Developer',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { type: 'separator' },
                { role: 'toggledevtools' },
            ]
        }
    ] : []),
    ...(!isMac ? [{
        label: 'About',
        submenu: [
            {
                label: 'About',
                click: createAboutWindow,
            },
        ]
    }] : []),
]



ipcMain.on('image:resize', (e, args) => {
    args.dest = path.join(os.homedir(), 'imageshrink')
    console.log(args)
    //shrinkImage(args)
})

async function shrinkImage() {

}