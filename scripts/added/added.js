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
  const header = document.getElementById('header');
  header.style.position = 'relative'

  const toggle = document.createElement('input');
  toggle.type = 'checkbox';
  toggle.className = 'toggle-add-workaround';

  header.append(toggle);

  // delete errors and whatnot
  localStorage.removeItem('dispatchOne');
  localStorage.removeItem('dispatchTwo');

  // add set to localStorage
  localStorage.setItem('ddorders', JSON.stringify([]));

  // monkey patch main functions
  const tempCallAgg = window.callAggregatorWithPw;
  const tempCancelAgg = window.cancelAggregator;

  window.callAggregatorWithPw = (orderId) => {
    const ddOrders = new Set(eval(localStorage.getItem('ddorders')));
    if (!(ddOrders.has(+orderId))) {
      ddOrders.add(+orderId);
    }
    localStorage.setItem('ddorders', JSON.stringify([...ddOrders]));
    tempCallAgg(orderId);
  }

  window.cancelAggregator = (orderId, aggCarrierId) => {
    const ddOrders = new Set(eval(localStorage.getItem('ddorders')));
    if (ddOrders.has(+orderId)) {
      ddOrders.delete(+orderId);
    }
    localStorage.setItem('ddorders', JSON.stringify([...ddOrders]));
    tempCancelAgg(orderId, aggCarrierId);
  }

  // create agg blocker interval
  const interval = window.setInterval(() => {
    const ordersAssign = document.getElementById('order-assign');
    for (const order of ordersAssign.childNodes) {
      if (new Set(eval(localStorage.getItem('ddorders'))).has(+order.childNodes[1].dataset.id)) { return }
      if (order.childNodes[1].childElementCount >= 4 && new Set(['W', 'w']).has(order.childNodes[1].childNodes[1].innerText.charAt(0))) {

      }
    }
    for (let i = 0; i < orders.length; i++) {
      if (new Set(['W', 'w']).has(orders[i].childNodes[1].innerText.charAt(0))) {
        orders[i].childNodes[1].innerText = 'agg canceled';
      }
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