const { BrowserWindow, app, ipcMain } = require('electron');

ipcMain.on('quit-app', (evt, arg) => {
  app.quit()
})

function start() {
    let win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true
        },
        autoHideMenuBar: true,
        frame: false
    })
    win.loadFile("./html/index.html")
}


app.on('ready', () => {
    start()
})