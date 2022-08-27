const fs = require('fs')
const os = require('os')

window.os = function() {
    return os;
}

window.fs = function() {
    return fs;
}