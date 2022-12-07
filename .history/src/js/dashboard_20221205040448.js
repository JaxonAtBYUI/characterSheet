import { loadHeaderFooter } from "./utils.mjs";
import supabase from "./SupaSetup.mjs"

console.log(supabase);

let { data: characters, error } = await supabase
  .from('characters')
  .select('id');

console.log(characters.length);

for(i = 0; i <characters.length; i++){
  const name = characters[i].name;
  const class = characters[i].class;
  const level = characters[i].
  const background=
  const ac =
  const initiative=
  const speed =
  const firstItem = 
}

loadHeaderFooter();