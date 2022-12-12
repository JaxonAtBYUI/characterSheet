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
        this.init()
    }

    async init() {

        // Get their session
        this.getSession();

        
        if (this.characterId > 0) {
            this.characterData = await this.getOneCharacter();
            this.fillData();
        }
        else {
            this.insert = true;
        }
        
        console.log("Form Data");
        getCharacterData();
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
    }

    fillData() {
        
        // Fill in the text data
        for (const [key, value] of Object.entries(this.characterData)) {
            var elements = document.getElementsByName(key);
            
            if (elements[0] != null) {
                // Checkboxes
                console.log(elements[0]);
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

}
