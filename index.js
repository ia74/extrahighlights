const { BrowserWindow, app } = require('electron');

function start() {
    let win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true
        }
    })
    win.loadFile("./html/index.html")
}

app.on('ready', () => {
    start()
})