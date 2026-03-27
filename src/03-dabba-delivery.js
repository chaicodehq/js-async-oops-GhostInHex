/**
 * 🍱 Mumbai ka Dabbawala Service - ES6 Classes
 */
export class DabbaService {
  constructor(serviceName, area) {
    this.serviceName = serviceName;
    this.area = area;
    this.customers = [];
    this._nextId = 1;
  }

  addCustomer(name, address, mealPreference) {
    const validPreferences = ["veg", "nonveg", "jain"];
    if (!validPreferences.includes(mealPreference)) return null;
    const duplicate = this.customers.some((c) => c.name === name);
    if (duplicate) return null;
    const customer = {
      id: this._nextId++,
      name,
      address,
      mealPreference,
      active: true,
      delivered: false,
    };
    this.customers.push(customer);
    return customer;
  }

  removeCustomer(name) {
    const customer = this.customers.find((c) => c.name === name);
    if (!customer || !customer.active) return false;
    customer.active = false;
    return true;
  }

  createDeliveryBatch() {
    const activeCustomers = this.customers.filter((c) => c.active);
    // Reset delivered for all active customers
    activeCustomers.forEach((c) => (c.delivered = false));
    return activeCustomers.map((c) => ({
      customerId: c.id,
      name: c.name,
      address: c.address,
      mealPreference: c.mealPreference,
      batchTime: new Date().toISOString(),
    }));
  }

  markDelivered(customerId) {
    const customer = this.customers.find(
      (c) => c.id === customerId && c.active
    );
    if (!customer) return false;
    customer.delivered = true;
    return true;
  }

  getDailyReport() {
    const active = this.customers.filter((c) => c.active);
    const delivered = active.filter((c) => c.delivered).length;
    const mealBreakdown = { veg: 0, nonveg: 0, jain: 0 };
    active.forEach((c) => {
      if (mealBreakdown.hasOwnProperty(c.mealPreference)) {
        mealBreakdown[c.mealPreference]++;
      }
    });
    return {
      totalCustomers: active.length,
      delivered,
      pending: active.length - delivered,
      mealBreakdown,
    };
  }

  getCustomer(name) {
    return this.customers.find((c) => c.name === name) || null;
  }
}
