# Aggregator Workaround
This is a small program created to circumvent Dragontail's auto-aggregate toggle, giving full control of the dispatch screen back to the in-store employees. This program mimics turning the toggle off, but without alerting Dragontail or out-of-store management.

### Background
From what I gather, the out-of-store management team made some type of contract with Doordash and/or Dragontail. I am not clear as to the specific wording, or even if the contract exists, but the overview seems to be that stores are required to allow Doordash to automatically send delivery orders to Doordash that would otherwise go to in-store delivery drivers. Turning off the auto-aggregate toggle is therefore considered a breach of contract. Regardless of whether the contract exists, out-of-store management has made it clear that anyone found to have turned the toggle off will be fired, along with the General Manager of the store.

The AI powering the Dragontail dispatch makes loads of mistakes daily and is simply not sufficient for its task. Any in-store employee could do a better job after ~30 minutes (probably less) of training on the dispatch screen. Most managers and drivers are already better than the AI at dispatching. The only real upside to using the AI is as backup if the store is understaffed or sufficiently busy.

## The Program
- [How it Works](#how-it-works)
- [Store the function](#store-the-function)
- [Run the function](#run-the-function)

### How it works
The startup function does the following:
1) creates a `toggle` to turn the `interval function` on/off
2) creates an empty `array` that will contain order IDs
3) 'monkey patches' the existing doordash functions activated when an in-store employee manually aggregates an order or manually cancels an aggregated order. The new functions add/remove order IDs from the `array` before running the original functions
4) sets an `interval function` to run every `2` seconds. If the `toggle` is on, the function will cancel any orders found to be waiting for an aggregator if that order's order ID is not in the `array`

Toggle the `toggle` off to let the AI take over. Toggle it on to disable the AI's decisions.

Any orders with an order ID found in the `array` will not be canceled by the `interval function`. This ensures that any orders in-store employees aggregate manually will be aggregated.

### Store the function
Open the Dragontail dispatch screen in a non-incognito window, then run the following code to store the startup function in localStorage under the key `fdd`. Unless localStorage is cleared out in the future, you only have to do this once.
``` js
localStorage.setItem('fdd', () => {
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
});
```

### Run the function

Whenever you want to activate the workaround, open the Dragontail dispatch in a non-incognito window and run the following code to retrieve the startup function previously stored in localStorage under the key `fdd`:
```js 
eval(localStorage.getItem('fdd'))();
```