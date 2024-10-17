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
const catchUp = () => {
  const orders = document.getElementsByClassName('order-container');
  for (let i = 0; i < orders.length; i++) {
    orders[i].childNodes[1].addEventListener("change", (e) => {
      orders[i].childNodes[2].innerText = e.target.value;
    })
  }
}

const interval = window.setInterval(() => {
  const orders = document.getElementsByClassName('order-container');
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].childNodes[1].innerText === 'waiting for agg...') {
      orders[i].childNodes[1].innerText = 'agg canceled';
    }
  }
}, 2000);

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

// !!!!

const changeStatus = (i) => {
  const orders = document.getElementsByClassName('order-container');
  orders[i].childNodes[1].innerText = "waiting for agg...";
}

// add listener to any new orders
const addNewOrder = () => {}