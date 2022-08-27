const fs = require('fs')
const os = require('os');
const hiHome = os.userInfo().homedir+"\\AppData\\Local\\Temp\\Highlights";
let highlights;
let folders = [];

setup();

if(!fs.existsSync(hiHome)) {
    document.getElementById("noshadowplay").style.visibility = "visible";
}

reload()

function saveClip(folder, file) {
    console.log("Saving "+hiHome+"\\"+folder+"\\"+file)
    highlights.style.visibility = "hidden";
    document.getElementById("saving").style.visibility = "visible";
    fs.rename(hiHome+"\\"+folder+"\\"+file, os.userInfo().homedir+"\\Videos\\"+folder+"\\"+file, (e) => {
        console.log(e)
    })
    highlights.style.visibility = "visible";
    document.getElementById("saving").style.visibility = "hidden";
    reload()
}

function saveAll(folder) {
    fs.readdirSync(hiHome+"\\"+folder).forEach(file => {
        console.log("Saving "+hiHome+"\\"+folder+"\\"+file)
        highlights.style.visibility = "hidden";
        document.getElementById("saving").style.visibility = "visible";
        fs.rename(hiHome+"\\"+folder+"\\"+file, os.userInfo().homedir+"\\Videos\\"+folder+"\\"+file, (e) => {
            if(e) {
                console.log(e)
            }
        })
        highlights.style.visibility = "visible";
        document.getElementById("saving").style.visibility = "hidden";
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
    document.getElementById("saving").innerText = "Go capture some highlights, you don't have any unsaved ones!";
    document.getElementById("saving").style.visibility = "visible"
}

function setup() {
    document.getElementById("noshadowplay").innerText = "This tool only works with NVIDIA Shadowplay. You either have 0 unsaved highlights, GeForce Experience is not installed, the app does not have admin rights, or your temporary Highlights folder is missing!";
    document.getElementById("noshadowplay").style.visibility = "hidden";
    let a = document.createElement("h1")
    let b = document.createElement("h2");
    let c = document.createElement('div');
    c.id = "highlights";
    b.appendChild(document.createTextNode("Saving clip..."));
    b.id = "saving";
    b.style.visibility = "hidden";
    a.appendChild(document.createTextNode("Extra Highlights"));
    document.body.appendChild(a)
    document.body.appendChild(b)
    document.body.appendChild(c)
    highlights = document.getElementById("highlights");
}