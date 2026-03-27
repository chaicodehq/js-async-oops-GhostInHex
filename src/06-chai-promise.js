/**
 * ☕ Tapri ki Chai - Promise Creation: new Promise, resolve, reject
 */
const CHAI_PRICES = { cutting: 10, special: 20, ginger: 15, masala: 25 };

export function orderChai(type, quantity) {
  return new Promise((resolve, reject) => {
    if (!(type in CHAI_PRICES)) {
      return reject(new Error("Yeh chai available nahi hai!"));
    }
    if (typeof quantity !== "number" || quantity <= 0) {
      return reject(new Error("Kitni chai chahiye bhai?"));
    }
    setTimeout(() => {
      resolve({ type, quantity, total: CHAI_PRICES[type] * quantity });
    }, 100);
  });
}

export function checkIngredients(ingredient) {
  const validIngredients = ["tea", "milk", "sugar", "ginger", "cardamom"];
  return new Promise((resolve, reject) => {
    if (validIngredients.includes(ingredient)) {
      resolve({ ingredient, available: true });
    } else {
      reject(new Error(`${ingredient} khatam ho gaya!`));
    }
  });
}

export function prepareChaiWithTimeout(type, timeoutMs) {
  const chaiPromise = orderChai(type, 1);
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(
      () => reject(new Error("Bahut der ho gayi, chai nahi bani!")),
      timeoutMs
    );
  });
  return Promise.race([chaiPromise, timeoutPromise]);
}

export function processChaiQueue(orders) {
  if (!orders || orders.length === 0) return Promise.resolve([]);
  const promises = orders.map(({ type, quantity }) =>
    orderChai(type, quantity).then(
      (value) => ({ status: "fulfilled", value }),
      (err) => ({ status: "rejected", reason: err.message })
    )
  );
  return Promise.all(promises);
}
