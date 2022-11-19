// const baseURL = "https://www.dnd5eapi.co/api/"

/**
 * Loads a template from a given path
 * @param { string } path the location of the template 
 * @returns { template } the template as an HTML element
 */
export async function loadTemplate(path) {
  const data = await fetch(path);
  const template = await data.text();

  const newTemplate = document.createElement("template");
  newTemplate.innerHTML = template;

  return newTemplate;
}

/**
 * Renders part of a page using a template
 * @param { element } parent_node The elemenet the template will be rendered inot
 * @param { template } template The template to be filled
 * @param {*} data Optional data to be used with a hydrate function
 * @param {*} callback A hydrate function to fill out template with data
 */
export function renderwithTemplate(parent_node, template, data, callback) {
  let copy = template.content.cloneNode(true);

  if (callback) {
    copy = callback(copy, data);
  }

  parent_node.appendChild(copy);
}

/**
 * Loads the header and footer onto a page
 */
export async function loadHeaderFooter() {
  const footer = await loadTemplate("../partials/");
  const header = await loadTemplate("../partials/");

  const head = document.querySelector("header");
  const foot = document.querySelector("footer");

  renderwithTemplate(head, header);
  renderwithTemplate(foot, footer);
}