
// main function
const fdd = () => {
  const w = window;
  const d = document;
  const ls = localStorage;
  const t = d.createElement('input'); 
  t.type = 'checkbox'; t.id = 'ddtg'; t.checked = true; 
  d.getElementById('logo').append(t);
  ls.setItem('ddos', '[]'); 
  w.gDdosS = () => new Set(eval(ls.getItem('ddos')));
  w.hUDdos = (oId, add) => {
    const ddos = gDdosS();
    add ? ddos.add(+oId) : ddos.delete(+oId);
    ls.setItem('ddos', JSON.stringify([...ddos]));
  }
  const tca = w.callAggregatorWithPw; 
  w.callAggregatorWithPw = (oId) => {hUDdos(oId, true); console.log('dd', oId); tca(oId)}
  const tcag = w.cancelAggregator; 
  w.cancelAggregator = (oId, acId) => {hUDdos(oId, false); console.log('ca', oId); tcag(oId, acId)}
  w.setInterval(() => { 
    const tg = d.getElementById('ddtg'); 
    if (!tg || !tg.checked) return; 
    const ss = d.getElementById('order-assign').getElementsByClassName('newStatusTitle');
    const oIds = gDdosS();
    for (const s of ss) { 
      const oId = +s.parentNode.dataset.id;
      if (!oIds.has(oId) && s.dataset.status === 'waitingForAgg') cancelAggregator(oId);
    }
  }, 2000);
}

// improved main function?
const fdd2 = () => {
  const w = window; const d = document;
  const t = d.createElement('input'); t.type = 'checkbox'; t.id = 'ddtg'; t.checked = true; 
  d.getElementById('logo').append(t); w.ddos = new Set();
  const tca = w.callAggregatorWithPw; 
  w.callAggregatorWithPw = (oId) => {ddos.add(+oId); console.log('dd', oId); tca(oId)}
  const tcag = w.cancelAggregator; 
  w.cancelAggregator = (oId, acId) => {ddos.delete(+oId); console.log('ca', oId); tcag(oId, acId)}
  w.setInterval(() => {
    if (!t || !t.checked) return;
    for (const s of d.getElementById('order-assign').getElementsByClassName('newStatusTitle')) {
      const oId = +s.parentNode.dataset.id;
      if (!ddos.has(oId) && s.dataset.status === 'waitingForAgg') cancelAggregator(oId) }
  }, 2000);
}



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
