const fs = require('fs')
const os = require('os');
const hiHome = os.userInfo().homedir + "\\AppData\\Local\\Temp\\Highlights";
const viHome = os.userInfo().homedir + "\\Videos\\";
let chips = document.getElementById("chips");
let highlights = document.getElementById("highlights");
let saving = document.getElementById("saving");
let folders = [];

reload()

function saveClip(folder, file) {
    chips.style.display = "none";
    saving.style.display = "block";
    fs.rename(hiHome + "\\" + folder + "\\" + file, viHome + folder + "\\" + file, (e) => { })
    chips.style.display = "block";
    saving.style.display = "none";
    reload()
}

function saveAll(folder) {
    fs.readdirSync(hiHome + "\\" + folder).forEach(file => {
        chips.style.display = "none";
        saving.style.display = "block";
        fs.rename(hiHome + "\\" + folder + "\\" + file, viHome + folder + "\\" + file, (e) => { })
        chips.style.display = "block";
        saving.style.display = "none";
        reload()
    })
}

function reload() {
    let type = "";
    if (type == "") {
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
    }
}

if (chips.innerHTML == "") {
    saving.innerText = "Go capture some highlights, you don't have any unsaved ones!";
    saving.style.display = "block"
}

function reloadCss() {
    var links = document.getElementsByTagName("link");
    for (var cl in links) {
        var link = links[cl];
        if (link.rel === "stylesheet")
            link.href += "";
    }
}

function selectHighlights(folder) {
    highlights.innerHTML = "";
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