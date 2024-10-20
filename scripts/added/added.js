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
  // add styles

  // add toggle to dispatch
  const toggle = document.createElement('input');
  toggle.type = 'checkbox';
  toggle.id = 'ddtog';
  toggle.checked = true;
  document.getElementById('header').append(toggle);

  // add doordashed orders to localStorage
  localStorage.setItem('ddos', JSON.stringify([]));

  // monkey patch main functions
  const tempCallAgg = window.callAggregatorWithPw;
  window.callAggregatorWithPw = (orderId) => {
    const ddOrders = new Set(eval(localStorage.getItem('ddos')));
    if (!(ddOrders.has(+orderId))) ddOrders.add(+orderId);
    localStorage.setItem('ddos', JSON.stringify([...ddOrders]));
    tempCallAgg(orderId);
  }

  const tempCancelAgg = window.cancelAggregator;
  window.cancelAggregator = (orderId, aggCarrierId) => {
    const ddOrders = new Set(eval(localStorage.getItem('ddos')));
    if (ddOrders.has(+orderId)) ddOrders.delete(+orderId);
    localStorage.setItem('ddos', JSON.stringify([...ddOrders]));
    tempCancelAgg(orderId, aggCarrierId);
  }

  // create agg blocker interval
  window.setInterval(() => {
    const tog = document.getElementById('ddtog');
    if (!tog || !tog.checked) return; // if not currently activated, don't run
    const orderA = document.getElementById('order-assign');
    for (const order of orderA.childNodes) {
      // TODO: adjust for newly added doordash logo (if need be)
      const oB = order.childNodes[1];
      const oID = +oB.dataset.id;
      // if (has not been manually doordashed &&&& there is an added status &&&& the status is 'Waiting for agg...')
      if (!(new Set(eval(localStorage.getItem('ddos'))).has(oID)) && oB.childElementCount >= 4 && new Set(['W', 'w']).has(oB.childNodes[1].innerText.charAt(0))) cancelAggregator(oID);
    }
  }, 2000);
}

const DDDchangeStatus = (id) => {
  const orderContainer = document.getElementById('order-assign');
  for(const order of orderContainer.childNodes) {
    if (+order.childNodes[1].dataset.id === id) {
      const newStatus = document.createElement('div');
      newStatus.className = 'newStatusTitle';
      newStatus.innerText = 'Waiting for agg...';
      order.childNodes[1].childNodes[0].after(newStatus);
    }
  }
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

const addStyles = () => {
  const styles = `
    
  `;
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

// toggle to disable if needed
const createToggle = () => {
  const header = document.getElementById('dHeader');
  header.style.position = 'relative'

  const toggle = document.createElement('input');
  toggle.type = 'checkbox';
  toggle.className = 'toggle-add-workaround';

  header.append(toggle);
}



const toggleDisableAgg = () => {}

// each order has a button to agg manually

// !!!!

const changeStatus = (id) => {
  const orderContainer = document.getElementById('order-assign');
  for(const order of orderContainer.childNodes) {
    if (+order.childNodes[1].dataset.id === id) {
      const newStatus = document.createElement('div');
      newStatus.className = 'newStatusTitle';
      newStatus.innerText = 'Waiting for agg...';
      order.childNodes[1].childNodes[0].after(newStatus);
    }
  }
}

// add listener to any new orders
const addNewOrder = () => {}