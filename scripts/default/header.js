import helper from "../helper.js";

const header = document.createElement('header');
header.id = 'header';

const logo = document.createElement('div');
logo.id = 'logo';
logo.innerText = 'dt';

const title = document.createElement('h1');
title.innerText = 'Mock Dispatch';

helper.appendElements([logo, title], header);

export default header;