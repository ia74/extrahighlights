const fs = require('fs')
const os = require('os');
const hiHome = os.userInfo().homedir+"\\AppData\\Local\\Temp\\Highlights";
const viHome = os.userInfo().homedir+"\\Videos\\";
let highlights = document.getElementById("highlights");
let saving = document.getElementById("saving");
let folders = [];

if(!fs.existsSync(hiHome)) {
    
}

reload()

function saveClip(folder, file) {
    highlights.style.display = "none";
    saving.style.display = "block";
    fs.rename(hiHome+"\\"+folder+"\\"+file, viHome+folder+"\\"+file, (e) => {})
    highlights.style.display = "block";
    saving.style.display = "none";
    reload()
}

function saveAll(folder) {
    fs.readdirSync(hiHome+"\\"+folder).forEach(file => {
        highlights.style.display = "none";
        saving.style.display = "block";
        fs.rename(hiHome+"\\"+folder+"\\"+file, viHome+folder+"\\"+file, (e) => {})
        highlights.style.display = "block";
        saving.style.display = "none";
        reload()
    })
}

function reload() {
    let type = "";
    if(type == "") {
        highlights.innerHTML = "";
    fs.readdirSync(hiHome).forEach(folder => {
        if(fs.readdirSync(hiHome+"\\"+folder)) {
            let details = document.createElement("details");
            let summary = document.createElement("summary");
            let saveAllButton = document.createElement("button");
            saveAllButton.appendChild(document.createTextNode("Save All Clips"))
            saveAllButton.onclick = () => {
                saveAll(folder);
            }
            summary.appendChild(document.createTextNode(folder));
            details.appendChild(summary)
            details.id = folder;
            details.appendChild(saveAllButton)
            highlights.appendChild(details)
            fs.readdirSync(hiHome+"\\"+folder).forEach(file => {
                let p = document.createElement("p");
                p.id = file;
                let btn = document.createElement("button");
                btn.appendChild(document.createTextNode("Save Clip"));
                btn.onclick = () => {
                    saveClip(folder, file)
                }
                p.appendChild(document.createTextNode(file+" "))
                p.appendChild(btn)
                document.getElementById(folder).appendChild(p)
            })
        }
    })
    }
}

function isDirEmpty(dirname) {
    return fs.promises.readdir(dirname).then(files => {
        return files.length === 0;
    });
}

if(highlights.innerHTML == "") {
    saving.innerText = "Go capture some highlights, you don't have any unsaved ones!";
    saving.style.display = "block"
}