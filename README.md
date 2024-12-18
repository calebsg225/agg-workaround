# Aggregator Workaround
This is a small program created to circumvent Dragontail's auto-aggregate toggle, giving full control of the dispatch screen back to the in-store employees. This program mimics turning the toggle off, but ***without alerting Dragontail or out-of-store management.***

### Background
The AI powering the Dragontail dispatch makes loads of mistakes daily and is simply not sufficient for its task. Any in-store employee could do a better job after ~30 minutes (probably less) of training on the dispatch screen. Most managers and drivers are already better than the AI at dispatching. The only real upside to using the AI is as backup if the store is understaffed or sufficiently busy. Out-of-store management has made it clear that ***anyone who turns the auto-aggregate toggle off will be fired.***

## The Program
- [How it Works](#how-it-works)
- [Store the function](#store-the-function)
- [Run the function](#run-the-function)

### How it works
The `startup function` does the following:
1) creates a `toggle` to turn the `interval function` on/off
2) creates an empty `set` that will contain order IDs
3) 'monkey patches' the existing doordash functions activated when an in-store employee manually aggregates an order or manually cancels an aggregated order. The new functions add/remove order IDs from the `set` before running the original functions
4) sets an `interval function` to run every `2` seconds. If the `toggle` is on, the function will cancel any orders found to be waiting for an aggregator if that order's order ID is not in the `set`

Toggle the `toggle` off to let the AI take over. Toggle it on to disable the AI's decisions.

Any orders with an order ID found in the `set` will not be canceled by the `interval function`. This ensures that any orders in-store employees aggregate manually will be aggregated as intended.

### Store the function
**\*\*If you do not know the url of your Dragontail dispatch, hover over the zoom buttons for the map. The url will appear in the bottom left corner of the screen. It will look something like: `http://10._._._:____/dispatch`. This is the URL you will enter into the browser.**

**IMPORTANT: Dragontails' system was not built to handle multiple dispatch screens simultaneously. Therefore, it is recommended that you close the previous dispatch screen before entering the URL for the new one.**

Open the Dragontail dispatch screen in a non-incognito window, then run the following code to store the `startup function` in localStorage under the key `fdd`. Unless localStorage is cleared out in the future, you only have to do this once.
``` js
// compact code for quick(er) typing
localStorage.setItem('fdd', () => {
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
});
```

### Run the function

Whenever you want to activate the program, open the Dragontail dispatch in a non-incognito window and run the following code to retrieve and run the `startup function` previously stored in localStorage under the key `fdd`:
```js 
eval(localStorage.getItem('fdd'))();
```
