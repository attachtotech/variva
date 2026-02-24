// js/cart-core.js

window.VarivaCart = (function () {

  let cart = [];


  function load() {

    const saved = localStorage.getItem('varivaCart');

    if (saved) {
      try {
        const data = JSON.parse(saved);
        cart = data.items || [];
      } catch {
        cart = [];
      }
    }
  }


  function save() {

    localStorage.setItem(
      'varivaCart',
      JSON.stringify({ items: cart })
    );
  }


  function get() {
    return cart;
  }


  function add(item) {

    let existing = cart.find(i => i.id === item.id);

    if (existing) {
      existing.quantity++;
    } else {
      item.quantity = 1;
      cart.push(item);
    }

    save();
  }


  function remove(id) {

    cart = cart.filter(i => i.id !== id);

    save();
  }


  function update(id, qty) {

    const item = cart.find(i => i.id === id);

    if (!item) return;

    if (qty <= 0) {
      remove(id);
    } else {
      item.quantity = qty;
    }

    save();
  }


  function count() {

    return cart.reduce((s, i) => s + i.quantity, 0);
  }


  // INIT
  load();

  return {
    get,
    add,
    remove,
    update,
    count,
    save,
    load
  };

})();