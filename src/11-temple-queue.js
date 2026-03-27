/**
 * 🛕 Mandir Darshan Queue - Static Methods, Getters/Setters, Symbol.iterator
 */
export class TempleQueue {
  #devotees;
  #maxCapacity;
  #vipEnabled;

  constructor(templeName, maxCapacity) {
    this.templeName = templeName;
    this.#devotees = [];
    this.#maxCapacity = maxCapacity > 0 ? maxCapacity : 100;
    this.#vipEnabled = false;
  }

  get length() {
    return this.#devotees.length;
  }

  get isEmpty() {
    return this.#devotees.length === 0;
  }

  get vipEnabled() {
    return this.#vipEnabled;
  }

  set vipEnabled(value) {
    if (typeof value !== "boolean") {
      throw new TypeError("VIP status must be a boolean");
    }
    this.#vipEnabled = value;
  }

  enqueue(name, type) {
    if (!name) return null;
    if (type !== "regular" && type !== "vip") return null;
    if (this.#devotees.length >= this.#maxCapacity) return null;
    const devotee = { name, type, joinedAt: new Date().toISOString() };
    if (type === "vip" && this.#vipEnabled) {
      this.#devotees.unshift(devotee);
    } else {
      this.#devotees.push(devotee);
    }
    return devotee;
  }

  dequeue() {
    if (this.#devotees.length === 0) return null;
    return this.#devotees.shift();
  }

  peek() {
    if (this.#devotees.length === 0) return null;
    return this.#devotees[0];
  }

  contains(name) {
    return this.#devotees.some((d) => d.name === name);
  }

  toArray() {
    return [...this.#devotees];
  }

  static merge(queue1, queue2) {
    const arr1 = queue1.toArray();
    const arr2 = queue2.toArray();
    const merged = new TempleQueue(
      `${queue1.templeName}-${queue2.templeName}`,
      arr1.length + arr2.length + 10
    );
    for (const d of arr1) {
      merged.#devotees.push({ ...d });
    }
    for (const d of arr2) {
      merged.#devotees.push({ ...d });
    }
    return merged;
  }

  static fromArray(templeName, maxCapacity, arr) {
    const queue = new TempleQueue(templeName, maxCapacity);
    if (!Array.isArray(arr)) return queue;
    for (const name of arr) {
      queue.enqueue(name, "regular");
    }
    return queue;
  }

  [Symbol.iterator]() {
    let index = 0;
    const devotees = this.#devotees;
    return {
      next() {
        if (index < devotees.length) {
          return { value: devotees[index++], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}
