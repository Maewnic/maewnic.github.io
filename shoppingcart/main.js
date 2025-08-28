const cartTotalText = document.querySelector("#cartTotal");
console.log(cartTotalText);
let cartTotal = 0;

let shoppingCart = [
  { name: "T-shirt", price: 20 },
  { name: "Jeans", price: 50 },
  { name: "Sneakers", price: 80 },
  { name: "Bagpack", price: 30 },
];

function addToCartTotal(item) {
  console.log("item added:", item);
  console.log("item price:", item.price);
  cartTotal = cartTotal + item.price;
  console.log("running total:", cartTotal);
}

function calculateCart() {
  shoppingCart.forEach(addToCartTotal);
  cartTotalText.textContent = cartTotal;
}

function checkDiscount() {
  if (cartTotal > 100) {
    cartTotal = cartTotal * 0.9;
  }
  console.log(cartTotal);
  cartTotalText.textContent = cartTotal;
}

console.log("Your cart total is:", cartTotal);
