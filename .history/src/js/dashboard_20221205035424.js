import { loadHeaderFooter } from "./utils.mjs";
import supabase from "./SupaSetup.mjs"

console.log(supabase);

let { data: characters, error } = await supabase
  .from('characters')
  .select('id');

console.log(data);

loadHeaderFooter();