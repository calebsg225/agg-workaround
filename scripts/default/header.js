import helper from "../helper.js";

const header = document.createElement('header');
header.id = 'header'

const title = document.createElement('h1');
title.innerText = 'Mock Dispatch';

helper.appendElements([title], header);

export default header;