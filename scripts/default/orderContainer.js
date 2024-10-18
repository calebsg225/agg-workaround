import helper from "../helper.js";

// status: waiting for agg
const createOrder = (name, status) => {
  const orderId = Math.floor(Math.random() * 100000000);

  const orderContainer = document.createElement('div');
  orderContainer.className = 'group';

  const groupSide = document.createElement('div');
  groupSide.className = 'group-side';

  const orderMain = document.createElement('div');
  orderMain.dataset.id = orderId;


  const oCheckboxSelector = document.createElement('div');
  oCheckboxSelector.className = 'checkboxSelector';

  const oBody = document.createElement('div');
  oBody.className = 'body';
  oBody.innerText = orderId;

  const oInfo = document.createElement('div');
  oInfo.className = 'info';

  helper.appendElements([oCheckboxSelector, oBody, oInfo], orderMain);

  helper.appendElements([groupSide, orderMain], orderContainer);
  return orderContainer;
}

export { createOrder }
