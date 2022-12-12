import supabase from "./SupaSetup.mjs";
import { getParam } from "./utils.mjs"


function getCharacterData() {
    const form = document.getElementById('characterSheet');
    const formData = new FormData(form);
    const json =  {...Object.fromEntries(formData)}
    return json
}

function fillDataByName(value, name) {
    element = document.getElementsByName(name)[0];
    element.value = value;
}

export default class Characters {
    
    constructor (id) {
        this.insert = false;
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
            this.characterData = await this.getOneCharacter();
            this.fillData();
            this.getModifiers();
        }
        else {
            this.insert = true;
        }
        
        getCharacterData();
        this.getModifiers();
        this.displayModifiers();

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
        characterData = getCharacterData();

        const { data, error } = await supabase
            .from('characters')
            .insert([
                characterData,
            ]);

        location.href = `../characterSheet/index.html?id=${this.id}`;
    }


    /**
     * Update the character that is currently being viewed.
     */
    async updateCharacter() {
        characterData = getCharacterData();

        const { data, error } = await supabase
            .from('characters')
            .update({ other_column: 'otherValue' })
            .eq('id', this.id);

    }

    /**
     * Delete the character you are currently viewing.
     */
    async deleteCharacter() {
        const { data, error } = await supabase
            .from('characters')
            .delete()
            .eq('id', this.id)
        
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
    

}
