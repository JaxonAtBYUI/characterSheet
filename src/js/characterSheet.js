import { loadHeaderFooter, getParam } from "./utils.mjs";
import Characters from "./Characters.mjs"

loadHeaderFooter();

const chara = new Characters();

let stats = [...document.getElementsByClassName("stat")];
let savings = [...document.getElementsByClassName("saving_throw")];
let skills = [...document.getElementsByClassName("skill")];

let blurListeners = stats.concat(savings).concat(skills);
blurListeners.forEach(element => {
    element.querySelector("input").addEventListener("blur", function() {
        chara.getModifiers();
        chara.displayModifiers();
    })
});

const characterId = getParam("id")
if (characterId > 0) {
    document.querySelector("#saveCharacter").addEventListener("click", chara.updateCharacter)
}
else document.querySelector("#saveCharacter").addEventListener("click", chara.insertCharacter)

document.querySelector("#deleteCharacter").addEventListener("click", chara.deleteCharacter)