import helper from "../helper.js";
import { createOrder } from "./orderContainer.js";

const main = document.createElement('main');
main.id = 'main';

const elements = [];
for (let i = 0; i < 10; i++) {
  elements.push(createOrder(('order '+ i), 'hut'));
}

helper.appendElements(elements, main);

export default main;