import { loadHeaderFooter } from "./utils.mjs";
import supabase from "./SupaSetup.mjs"

console.log(supabase);

let { data: characters, error } = await supabase
  .from('characters')
  .select('id');

console.log(characters.length);

for(i = 0; i <characters.length; i++){
  const class =
  const level = 
  const background=
  const 
}

loadHeaderFooter();