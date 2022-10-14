const fs = require('fs')
const os = require('os')
const { ipcRenderer } = require('electron');

window.os = function() {
    return os;
}

window.fs = function() {
    return fs;
}

window.ipc = function () {
    return ipcRenderer;
}
