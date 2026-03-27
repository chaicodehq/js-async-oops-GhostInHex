/**
 * 🥛 Punjab ki Famous Lassi Stand Chain - Constructor Functions & Prototype
 */
export function LassiStand(name, city) {
  this.name = name;
  this.city = city;
  this.menu = [];
  this.orders = [];
  this._nextOrderId = 1;
}

LassiStand.prototype.addFlavor = function (flavor, price) {
  if (price <= 0) return -1;
  const exists = this.menu.some((item) => item.flavor === flavor);
  if (exists) return -1;
  this.menu.push({ flavor, price });
  return this.menu.length;
};

LassiStand.prototype.takeOrder = function (customerName, flavor, quantity) {
  if (quantity <= 0) return -1;
  const menuItem = this.menu.find((item) => item.flavor === flavor);
  if (!menuItem) return -1;
  const order = {
    id: this._nextOrderId++,
    customer: customerName,
    flavor,
    quantity,
    total: menuItem.price * quantity,
    status: "pending",
  };
  this.orders.push(order);
  return order.id;
};

LassiStand.prototype.completeOrder = function (orderId) {
  const order = this.orders.find((o) => o.id === orderId);
  if (!order || order.status === "completed") return false;
  order.status = "completed";
  return true;
};

LassiStand.prototype.getRevenue = function () {
  return this.orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.total, 0);
};

LassiStand.prototype.getMenu = function () {
  return [...this.menu];
};

export function isLassiStand(obj) {
  return obj instanceof LassiStand;
}
