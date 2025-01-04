/**
 * This function will return the total price of the products in the cart
 * @param {Array} products cartProducts: Array of Objects
 * @returns {number} total price
 */
const totalPrice = (products) => {
  let sum = 0;
  products.forEach((product) => (sum += product.price));
  return sum;
};

export { totalPrice };
