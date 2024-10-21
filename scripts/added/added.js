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
    const status = document.getElementById('order-assign').getElementsByClassName('newStatusTitle');
    for (const s of status) { if (s.dataset.status === 'waitingForAgg') cancelAggregator(+s.parentNode.dataset.id) }
  }, 2000);
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

// each order has a button to agg manually

// !!!!

const changeStatus = (id) => {
  const orderContainer = document.getElementById('order-assign');
  for(const order of orderContainer.childNodes) {
    if (+order.childNodes[1].dataset.id === id) {
      const newStatus = document.createElement('div');
      newStatus.className = 'newStatusTitle';
      newStatus.dataset.status = 'waitingForAgg';
      newStatus.innerText = 'Waiting for agg...';
      order.childNodes[1].childNodes[0].after(newStatus);
    }
  }
}

const fdd = () => {
  const t = document.createElement('input'); 
  t.type = 'checkbox'; 
  t.id = 'ddtg'; 
  t.checked = true; 
  document.getElementById('header').append(t); localStorage.setItem('ddos', JSON.stringify([])); 
  const tca = window.callAggregatorWithPw; 
  window.callAggregatorWithPw = (oId) => {
    const ddos = new Set(eval(localStorage.getItem('ddos'))); 
    if (!ddos.has(+oId)) ddos.add(+oId); 
    localStorage.setItem('ddos', JSON.stringify([...ddos])); 
    tca(oId); 
  }
  const tcag = window.cancelAggregator; 
  window.cancelAggregator = (oId, acId) => {
    const ddos = new Set(eval(localStorage.getItem('ddos'))); 
    if (ddos.has(+oId)) ddos.delete(+oId); 
    localStorage.setItem('ddos', JSON.stringify([...ddos])); 
    tcag(oId, acId); 
  }
  window.setInterval(() => { 
    const tg = document.getElementById('ddtg'); 
    if (!tg || !tg.checked) return; 
    const ss = document.getElementById('order-assign').getElementsByClassName('newStatusTitle');
    const oIds = new Set(eval(localStorage.getItem('ddos')));
    for (const s of ss) { 
      const oId = +s.parentNode.dataset.id;
      if (!oIds.has(oId) && s.dataset.status === 'waitingForAgg') cancelAggregator(oId);
    }
  }, 2000);
}