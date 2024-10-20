import helper from "./helper.js";
import header from "./default/header.js";
import main from "./default/main.js";

helper.appendElements([header, main], document.body);

window.cancelAggregator = (orderId, aggCarrierId) => {
  console.log('canceling', orderId);
}

window.callAggregatorWithPw = (orderId) => {
  console.log('agging', orderId);
}