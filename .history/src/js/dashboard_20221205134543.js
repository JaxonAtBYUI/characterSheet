import { loadHeaderFooter, loadTemplate } from "./utils.mjs";
import supabase from "./SupaSetup.mjs"

console.log(supabase);

let { data: characters, error } = await supabase
  .from('characters')
  .select('*');
const template = await loadTemplate("../partials/dashboard_item.html");
console.log(characters.length);
console.log(template);

for(let i = 0; i <characters.length; i++){
  // const name = characters[i].name;
  // const cls = characters[i].class;
  // const level = characters[i].level;
  // const background= characters[i].background;
  // const ac = armor_class;
  // const initiative = characters[i].initiative;
  // const speed = character[i].speed;
  // const firstItem =
  // 
  console.log(name);
  renderDashboard(template, chracters[i])
}
function renderDashboard(template, item){
  const items = document.querySelector('.dashBoard__items');
  // const item = `
  //     <div class="character__item">
  //       <div class="name"><h3>${name}</h3></div>
  //       <div class="character__info">
  //       <span>${cls}</span><span>${level}</span><span>${background}</span><span>AC</span><span>Initiative</span><span>Speed</span><span>First Item</span>
  //       </div>
  //     </div>`;
  template.querySelector(".name").innerHTML = item.name;
  template.querySelector(".cls").innerHTML = item.class
  template.querySelector(".lvl").innerHTML = item.level;
  template.querySelector(".bg").innerHTML = item.background;
  template.querySelector(".ac").innerHTML = item.armor_class;
  template.querySelector(".initiative").innerHTML = item.iniative;
  template.querySelector(".speed").innerHTML = item.speed;
  // items.appendChild(item);

}

loadHeaderFooter();