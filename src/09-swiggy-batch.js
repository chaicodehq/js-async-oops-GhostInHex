/**
 * 🍔 Swiggy Batch Delivery System - Promise.all, Promise.race, Promise.allSettled
 */
export function prepareOrder(item, prepTime) {
  return new Promise((resolve, reject) => {
    if (!item) return reject(new Error("Item name required!"));
    if (typeof prepTime !== "number" || prepTime <= 0)
      return reject(new Error("Invalid prep time!"));
    setTimeout(() => {
      resolve({ item, ready: true, prepTime });
    }, prepTime);
  });
}

export function prepareBatch(items) {
  if (!items || items.length === 0) return Promise.resolve([]);
  return Promise.all(items.map((i) => prepareOrder(i.name, i.prepTime)));
}

export function getFirstReady(items) {
  if (!items || items.length === 0)
    return Promise.reject(new Error("No items to prepare!"));
  return Promise.race(items.map((i) => prepareOrder(i.name, i.prepTime)));
}

export function prepareSafeBatch(items) {
  if (!items || items.length === 0) return Promise.resolve([]);
  return Promise.allSettled(items.map((i) => prepareOrder(i.name, i.prepTime))).then(
    (results) =>
      results.map((r) => {
        if (r.status === "fulfilled") {
          return { status: "fulfilled", value: r.value };
        }
        return { status: "rejected", reason: r.reason.message };
      })
  );
}

export function deliverWithTimeout(orderPromise, timeoutMs) {
  if (typeof timeoutMs !== "number" || timeoutMs <= 0) {
    return Promise.reject(new Error("Invalid timeout!"));
  }
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Delivery timeout!")), timeoutMs);
  });
  return Promise.race([orderPromise, timeoutPromise]);
}

export async function batchWithRetry(items, maxRetries) {
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await prepareBatch(items);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}
