import helper from "../helper.js";

// status: waiting for agg
const createOrder = (name, status) => {

  const orderContainer = document.createElement('div');
  orderContainer.id = 'order'
  
  const orderName = document.createElement('h2');
  orderName.innerText = name;
  orderName.className = status;

  const statusV = document.createElement('h3');
  statusV.innerText = status;

  helper.appendElements([orderName, statusV], orderContainer);
  return orderContainer;
}

export { createOrder }
