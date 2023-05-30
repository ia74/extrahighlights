const fs = require('fs');
const os = require('os');
let hiHome = localStorage.getItem("highlightsHome");
let viHome = localStorage.getItem("videoHome");
let chips = document.getElementById("chips");
let highlights = document.getElementById("highlights");
let saving = document.getElementById("saving");
let folders = [];

if (!localStorage.getItem("highlightsHome")) {
    localStorage.setItem("highlightsHome", os.userInfo().homedir + "\\AppData\\Local\\Temp\\Highlights");
}

if (!localStorage.getItem("videoHome")) {
    localStorage.setItem("videoHome", os.userInfo().homedir + "\\Videos\\");

}

reload()
function saveClip(folder, file) {
    chips.style.display = "none";
    saving.style.display = "block";
    fs.rename(hiHome + "\\" + folder + "\\" + file, viHome + folder + "\\" + file, (e) => { })
    chips.style.display = "block";
    saving.style.display = "none";
    reload(folder)
}

function saveAll(folder) {
    fs.readdirSync(hiHome + "\\" + folder).forEach(file => {
        chips.style.display = "none";
        saving.style.display = "block";
        fs.rename(hiHome + "\\" + folder + "\\" + file, viHome + folder + "\\" + file, (e) => { })
        chips.style.display = "block";
        saving.style.display = "none";
        reload(folder)
    })
}

function reload(folderName = null) {
    let type = "";
    let hiHome = localStorage.getItem("highlightsHome");

    if (type == "") {
        highlights.innerHTML = "";
        chips.innerHTML = "";

        fs.readdirSync(hiHome).forEach(folder => {
            if (fs.readdirSync(hiHome + "\\" + folder)) {
                let div = document.createElement("div");
                div.className = "chip highlightChip z-depth-2 noselect";
                div.innerText = folder;
                div.onclick = e => {
                    selectHighlights(folder);
                }
                chips.appendChild(div)
            }
        })
        if (folderName) {
            selectHighlights(folderName)
        }
    }
}

if (chips.innerHTML == "") {
    saving.innerText = "Go capture some highlights, you don't have any unsaved ones!";
    saving.style.display = "block"
}

function selectHighlights(folder) {
    highlights.innerHTML = "";
    document.getElementById("choosegame").innerText = folder;
    if (folder == "ExtraHighlights-Empty") {
        document.getElementById("choosegame").innerText = "Choose a game to save your highlights from!";
        return;
    }
    let div = document.createElement("button");
    div.className = "btn highlightChip z-depth-2 noselect";
    div.innerText = "Close";
    div.onclick = e => {
        selectHighlights("ExtraHighlights-Empty");
    }
    highlights.appendChild(div)
    let saveAllButton = document.createElement("button");
    saveAllButton.className = "btn";
    saveAllButton.appendChild(document.createTextNode("Save All Clips"))
    saveAllButton.onclick = () => {
        saveAll(folder);
    }
    highlights.append(saveAllButton)
    fs.readdirSync(hiHome + "\\" + folder).forEach(file => {
        let p = document.createElement("p");
        p.id = file;
        p.className = "card-panel teal lighten-2";
        p.appendChild(document.createTextNode(file + " "))
        let btn = document.createElement("button");
        btn.appendChild(document.createTextNode("Save Clip"));
        btn.className = "btn"
        btn.onclick = () => {
            saving.innerText = "Saving clip!";
            saving.style.display = "block"
            saveClip(folder, file)
        }
        p.appendChild(btn)
        highlights.appendChild(p)
        saving.style.display = "none"
    })

}


const { ipcRenderer } = require('electron');
const closeApp = document.getElementById('close-app');
closeApp.addEventListener('click', () => {
    ipcRenderer.send('quit-app');
});