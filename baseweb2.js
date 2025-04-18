let cart = [];
let total = 0;

function updateCartDisplay() {
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    cartItems.appendChild(li);
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total;
}

function clearCart() {
  cart = [];
  total = 0;
  updateCartDisplay();
}

function addToCart(item) {
  cart.push(item);
  total += item.price;
  updateCartDisplay();
}

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".menu-item");

  items.forEach(itemEl => {
    itemEl.addEventListener("click", () => {
      const name = itemEl.querySelector("h3").textContent;
      const price = parseInt(itemEl.querySelector("strong").textContent.replace("₹", ""));
      addToCart({ name, price });
    });
  });

  document.getElementById("clear-cart").addEventListener("click", clearCart);

  document.getElementById("place-order").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const phoneNumber = "918446451415";
    const orderDetails = cart.map(item => `• ${item.name} - ₹${item.price}`).join("\n");
    const message = encodeURIComponent(
      `Hello! I’d like to pre-order the following:\n\n${orderDetails}\n\nTotal: ₹${total}\n\nFrom: DYPCET Canteen Pre-Order 🍽️`
    );

    // Optional: Create UPI Payment Link
    const upiLink = `upi://pay?pa=atharvkodolkar@okhdfcbank&pn=DYPCET%20Canteen&am=${total}&cu=INR`;

    // Optionally show UPI link before redirecting to WhatsApp
    // window.open(upiLink, "_blank"); // Uncomment if you want to open UPI directly

    // Redirect to WhatsApp with message
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  });
});
