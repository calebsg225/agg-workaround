import helper from "./helper.js";
import header from "./default/header.js";
import main from "./default/main.js";

helper.appendElements([header, main], document.body);

window.cancelAggregator = (orderId, aggCarrierId) => {
  console.log('canceling', orderId);
  const orderS = document.getElementById(`order${orderId}`).getElementsByClassName('newStatusTitle')[0];
  orderS.dataset.status = "aggCanceled";
  orderS.innerText = "Agg canceled";
}

window.callAggregatorWithPw = (orderId) => {
  console.log('agging', orderId);
  const order = document.getElementById(`order${orderId}`);
  const ns = order.getElementsByClassName('newStatusTitle');
  if (ns.length) {
    ns[0].dataset.status = "waitingForAgg";
    ns[0].innerText = "Waiting for agg...";
    return;
  }
  const newStatus = document.createElement('div');
  newStatus.className = 'newStatusTitle';
  newStatus.dataset.status = 'waitingForAgg';
  newStatus.innerText = 'Waiting for agg...';
  order.childNodes[0].after(newStatus);
}