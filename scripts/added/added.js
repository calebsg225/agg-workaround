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

  const interval = window.setInterval(() => {
    const orders = document.getElementsByClassName('order-container');
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].childNodes[1].innerText === 'waiting for agg...') {
        orders[i].childNodes[1].innerText = 'agg canceled';
      }
    }
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