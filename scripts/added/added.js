// push function to localstorage
const pushLocalStorage = (key, data) => {
  localStorage.setItem(key, data.toString());
}

// pull function from localstorage
// returns the runnable function
const pullLocalStorage = (key) => {
  const rawFunc = localStorage.getItem(key);
  return eval('(' + rawFunc + ')');
}

// startup function
const startup = () => {}

// add listener to existing orders
const catchUp = () => {}

// add listener to any new orders
const addNewOrder = () => {}

// toggle to disable if needed
const toggleDisableAgg = () => {}

// each order has a button to agg manually