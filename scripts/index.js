import helper from "./helper.js";
import header from "./default/header.js";
import main from "./default/main.js";

helper.appendElements([header, main], document.body);

const cancelAggregator = (orderId, aggCarrierId) => {
  console.log('canceling', orderId);
}

const callAggregatorWithPw = (orderId) => {
  console.log('agging', orderId);
}