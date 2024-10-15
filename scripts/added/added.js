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
const startup = () => {
  // add toggle to dispatch
  const header = document.getElementById('dHeader');
  const toggle = document.createElement('button');

}


// add listener to existing orders
const catchUp = () => {}

// add listener to any new orders
const addNewOrder = () => {}

// toggle to disable if needed
const createToggle = () => {
  const header = document.getElementById('dHeader');
  header.style.position = 'relative'
  const toggle = document.createElement('button');
  toggle.innerText = 'toggle me';
  toggle.style.position = 'absolute';
  toggle.style.inset = '0 0 auto auto';
  header.append(toggle);
}

const toggleDisableAgg = () => {}

// each order has a button to agg manually