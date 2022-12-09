import { loadHeaderFooter } from "./utils.mjs";
import supabase from "./SupaSetup.mjs"

console.log(supabase);

let { data: characters, error } = await supabase
  .from('characters')
  .select('id');

console.log(characters.length);

for(i = 0; i <characters.length; i++){
  const name = characters[i].name;
  const cls = characters[i].class;
  const level = characters[i].level;
  const background= characters[i].background;
  // const ac = 
  // const initiative=
  // const speed = 
  // const firstItem = 
}
function renderDashboard(name, cls, level, background){
  const items = document.querySelector('.dashboard_items');
  const item = `
      <div class="character__item">
        <div class="name"><h3>${name}</h3></div>
        <div class="character__info">
        <span>{}</span><span>LVL</span><span>Background</span><span>AC</span><span>Initiative</span><span>Speed</span><span>First Item</span>
        </div>
      </div>`

}

loadHeaderFooter();