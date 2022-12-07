import supabase from "./SupaSetup.mjs";


function getCharacterData() {
    const form = document.getElementById('characterSheet');
    const formData = new FormData(form);
    const json =  {...Object.fromEntries(formData)}
    // console.log(formData)
}

export default class Characters {
    constructor (id) {
        this.characterId = id
        this.init()
    }

    async init() {
        this.getSession()
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
            .eq('id', this.id)
        
        console.log(characters);
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

}
