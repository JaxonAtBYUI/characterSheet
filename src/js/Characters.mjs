import supabase from "./SupaSetup.mjs";
import { getParam } from "./utils.mjs"

const TOP_URL = 'https://www.dnd5eapi.co/api'

function getCharacterData() {
    const form = document.getElementById('characterSheet');
    const formData = new FormData(form);
    const json =  {...Object.fromEntries(formData)};
    
    // Checkboxes
    const checks = ["saving_str", "saving_dex", "saving_const", "saving_int", "saving_wis", "saving_char", "acrobatics", "animal_handling", "arcana", "athletics", "deception", "history", "insight", "intimidation", "investigation", "medicine", "nature", "perception", "performance", "persuasion", "religion", "sleight_of_hand", "stealth", "survival" ]

    for (const name of checks) {
        const element = document.getElementsByName(name)[0];
        json[name] = (element.checked == true);
    }

    // Numbers
    const numbers = ["level", "experience", "cp", "sp", "ep", "gp", "pp", "armor_class", "speed", "initiative", "max_hit_points", "current_hit_points", "temp_hit_points", "inspiration", "proficiency_bonus", "perception", "str", "dex", "const", "int", "wis", "char"]

    for (const name of numbers) {
        const element = document.getElementsByName(name)[0];
        if (!element?.value || element?.value == "") json[name] = 0;
        else json[name] = parseInt(element.value);
        // json[name] = (element.checked == true);
    }
    

    return json
}

function fillDataByName(value, name) {
    element = document.getElementsByName(name)[0];
    element.value = value;
}

export default class Characters {
    
    constructor () {
        this.characterId = getParam("id")
        
        this.characterModifiers = {
            str: 0,
            dex: 0,
            const: 0,
            int: 0,
            wis: 0,
            char: 0,
        }

        this.init()
    }

    async init() {

        // Get their session
        this.getSession();

        
        if (this.characterId > 0) {
            await this.classMenu();
            this.characterData = await this.getOneCharacter();
            this.fillData();
            this.getModifiers();
            this.displayModifiers();
        }
        else {
            document.getElementById("deleteCharacter").style.display = "none";
        }
        

    }
    
    async getSession() {
        const {data : session} = await supabase.auth.getSession();
        this.userID = session.session.user.id;
    }

    /**
     * Grabs the charcter data from the database.
     */
    async getOneCharacter() {
        let { data: characters, error } = await supabase
            .from('characters')
            .select("*")

            // Filters
            .eq('id', this.characterId)
        
        return characters[0]
    }


    /**
     * Insert the character data is that is currently being edited into the table.
     */
    async insertCharacter() {
        try {
            const characterData = getCharacterData();
            const { data, error } = await supabase
                .from('characters')
                .insert([
                    characterData,
                ]);
        } catch (error) {
            console.log(`This is the error: ${error}`);
        }
        location.href = `../dashboard`;
    }


    /**
     * Update the character that is currently being viewed.
     */
    async updateCharacter() {
        const characterData = getCharacterData();
        const characterId = getParam("id");
        
        const { data, error } = await supabase
            .from('characters')
            .update(characterData)
            .eq('id', characterId)
    }

    /**
     * Delete the character you are currently viewing.
     */
    async deleteCharacter() {
        const characterId = getParam("id");

        const { data, error } = await supabase
            .from('characters')
            .delete()
            .eq('id', characterId);
        
        location.href = './dashboard';
    }

    /**
     * Fills in data for the character sheet with preexisting data.
     */
    fillData() {
        // Fill in the text data
        for (const [key, value] of Object.entries(this.characterData)) {
            var elements = document.getElementsByName(key);
            
            if (elements[0] != null) {
                // Checkboxes
                if ((elements[0].getAttribute('type') === 'checkbox') && (value == true)) {
                    elements[0].checked = true;
                }
                
                // Radios

                else if (elements[0].getAttribute('type') === 'radio') {
                    elements[value].checked = true;
                }
                
                // Text and Number  
                else{
                    elements[0].value = value;
                }
            }
        }
    }

    /**
     * Calculate Modifiers
     */
    getModifiers() {
        const possibleModifiers = [ -4, -4, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0 , 1, 1, 2, 2, 3, 3, 4, 4, 5, 5 ]
        let stats = [...document.getElementsByClassName("stat")];
        stats.forEach( element => {
            const modifier = element.querySelector("input").name;
            if (element.querySelector("input").value != null) {
                let value;
                if (element.querySelector("input").value >21 || element.querySelector("input").value < 0) {value = 10;}
                else {value = element.querySelector("input").value;}
                this.characterModifiers[modifier] = possibleModifiers[value];
            }
            else this.characterModifiers[modifier] = 0;
        })
    }

    /**
     * Display the modifiers
     */
    displayModifiers() {
        let stats = [...document.getElementsByClassName("stat")];
        let savings = [...document.getElementsByClassName("saving_throw")]
        let skills = [...document.getElementsByClassName("skill")]
        
        // Straight stats
        stats.forEach( element => {
            element.querySelector("span").innerHTML = this.characterModifiers[element.querySelector("input").name];
        })

        // Saving throws
        savings.forEach( element => {
            const proficient = element.querySelector("input").checked
            let mod = this.characterModifiers[element.classList[1]]
            if (proficient) mod += parseInt(document.getElementsByName("proficiency_bonus")[0].value);
            element.querySelector("span").innerHTML = mod;
        })

        skills.forEach( element => {
            const proficient = element.querySelector("input").checked
            let mod = this.characterModifiers[element.classList[1]]
            if (proficient) mod += parseInt(document.getElementsByName("proficiency_bonus")[0].value);
            element.querySelector("span").innerHTML = mod;
        })
    }
    
    /**
     * Proof of concept dropdown menu
     */
    async classMenu() { // https://www.dnd5eapi.co/api/classes
        const reqURL = TOP_URL + '/classes';
        let classes = await fetch(reqURL).then(response => response.json());
        classes = classes.results.map(DNDclass => DNDclass.name);
        const classSelect = document.getElementsByName("class")[0];
        classes.forEach( className => {
            classSelect.innerHTML += `<option value="${className}">${className}</option>`
        })
    }

}
