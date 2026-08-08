const products = [
  {
    id: 1,
    name: "AU AirBeat Wireless Earbuds",
    category: "Audio",
    price: 799,
    oldPrice: 1499,
    rating: 4.6,
    emoji: "🎧",
    description: "Wireless earbuds with immersive sound and a comfortable fit."
  },
  {
    id: 2,
    name: "AU Smart Watch X1",
    category: "Electronics",
    price: 1299,
    oldPrice: 2499,
    rating: 4.5,
    emoji: "⌚",
    description: "Stylish everyday smartwatch with useful smart features."
  },
  {
    id: 3,
    name: "Urban Street Sneakers",
    category: "Fashion",
    price: 1099,
    oldPrice: 1899,
    rating: 4.4,
    emoji: "👟",
    description: "Clean everyday sneakers designed for streetwear."
  },
  {
    id: 4,
    name: "RGB Mechanical Keyboard",
    category: "Gaming",
    price: 1499,
    oldPrice: 2499,
    rating: 4.8,
    emoji: "⌨️",
    description: "Mechanical keyboard with RGB lighting and responsive keys."
  },
  {
    id: 5,
    name: "AU Everyday Backpack",
    category: "Accessories",
    price: 699,
    oldPrice: 1199,
    rating: 4.5,
    emoji: "🎒",
    description: "Practical backpack for school, travel and everyday use."
  },
  {
    id: 6,
    name: "Portable Bluetooth Speaker",
    category: "Audio",
    price: 999,
    oldPrice: 1799,
    rating: 4.3,
    emoji: "🔊",
    description: "Portable speaker with powerful sound and compact design."
  },
  {
    id: 7,
    name: "Minimal Desk Lamp",
    category: "Home",
    price: 599,
    oldPrice: 999,
    rating: 4.2,
    emoji: "💡",
    description: "Minimal desk lamp for study and work."
  },
  {
    id: 8,
    name: "Classic Hoodie",
    category: "Fashion",
    price: 899,
    oldPrice: 1499,
    rating: 4.6,
    emoji: "🧥",
    description: "Soft everyday hoodie with a clean minimal design."
  },
  {
    id: 9,
    name: "Wireless Gaming Mouse",
    category: "Gaming",
    price: 899,
    oldPrice: 1599,
    rating: 4.7,
    emoji: "🖱️",
    description: "Responsive wireless gaming mouse for fast gameplay."
  },
  {
    id: 10,
    name: "Smartphone Stand",
    category: "Home",
    price: 249,
    oldPrice: 499,
    rating: 4.4,
    emoji: "📱",
    description: "Adjustable stand for videos, studying and calls."
  },
  {
    id: 11,
    name: "AU Classic Analog Watch",
    category: "Accessories",
    price: 1199,
    oldPrice: 1999,
    rating: 4.5,
    emoji: "⌚",
    description: "Clean classic watch designed for everyday use."
  },
  {
    id: 12,
    name: "Fast USB-C Charger",
    category: "Electronics",
    price: 649,
    oldPrice: 999,
    rating: 4.6,
    emoji: "🔌",
    description: "Compact fast charger for compatible USB-C devices."
  }
];

let visibleProducts = [...products];

let cart =
  JSON.parse(localStorage.getItem("auCart")) || [];

let wishlist =
  JSON.parse(localStorage.getItem("auWishlist")) || [];

const grid =
  document.getElementById("productGrid");

const emptyState =
  document.getElementById("emptyState");

const cartCount =
  document.getElementById("cartCount");


function money(value) {
  return "₹" + value.toLocaleString("en-IN");
}


function renderProducts(list = visibleProducts) {

  grid.innerHTML = "";

  if (list.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  list.forEach(product => {

    const liked =
      wishlist.includes(product.id);

    const card =
      document.createElement("article");

    card.className = "product";

    card.innerHTML = `
      <div class="product-image"
           onclick="openProduct(${product.id})">

        <button class="wishlist"
          onclick="event.stopPropagation();
          toggleWishlist(${product.id})">

          ${liked ? "♥" : "♡"}

        </button>

        <span>${product.emoji}</span>

      </div>

      <div class="product-info">

        <div class="product-category">
          ${product.category}
        </div>

        <h3 class="product-name">
          ${product.name}
        </h3>

        <div class="rating">
          ★ ${product.rating}
        </div>

        <div class="price">
          ${money(product.price)}

          <span class="old-price">
            ${money(product.oldPrice)}
          </span>
        </div>

        <button
          class="add-btn"
          onclick="addToCart(${product.id})">

          Add to Cart

        </button>

      </div>
    `;

    grid.appendChild(card);
  });
}


function filterCategory(category) {

  if (category === "All") {

    visibleProducts =
      [...products];

  } else {

    visibleProducts =
      products.filter(
        product => product.category === category
      );

  }

  document.getElementById(
    "sectionTitle"
  ).textContent =
    category === "All"
      ? "Trending products"
      : category;

  renderProducts();

  scrollToProducts();
}


function searchProducts() {

  const query =
    document
      .getElementById("searchInput")
      .value
      .trim()
      .toLowerCase();

  if (!query) {

    visibleProducts =
      [...products];

  } else {

    visibleProducts =
      products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
  }

  document.getElementById(
    "sectionTitle"
  ).textContent =
    query
      ? `Results for "${query}"`
      : "Trending products";

  renderProducts();
}


document
  .getElementById("searchInput")
  .addEventListener("keydown", event => {

    if (event.key === "Enter") {
      searchProducts();
    }

  });


function sortProducts() {

  const type =
    document.getElementById(
      "sortSelect"
    ).value;

  let sorted =
    [...visibleProducts];

  if (type === "low") {
    sorted.sort(
      (a, b) => a.price - b.price
    );
  }

  if (type === "high") {
    sorted.sort(
      (a, b) => b.price - a.price
    );
  }

  if (type === "rating") {
    sorted.sort(
      (a, b) => b.rating - a.rating
    );
  }

  renderProducts(sorted);
}


function addToCart(id) {

  const existing =
    cart.find(item => item.id === id);

  if (existing) {

    existing.qty++;

  } else {

    cart.push({
      id: id,
      qty: 1
    });

  }

  saveCart();

  showMessage("Added to cart 🛒");
}


function removeFromCart(id) {

  cart =
    cart.filter(item => item.id !== id);

  saveCart();

  renderCart();
}


function changeQuantity(id, amount) {

  const item =
    cart.find(item => item.id === id);

  if (!item) return;

  item.qty += amount;

  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }

  saveCart();

  renderCart();
}


function saveCart() {

  localStorage.setItem(
    "auCart",
    JSON.stringify(cart)
  );

  updateCartCount();
}


function updateCartCount() {

  const count =
    cart.reduce(
      (sum, item) => sum + item.qty,
      0
    );

  cartCount.textContent = count;
}


function renderCart() {

  const container =
    document.getElementById(
      "cartItems"
    );

  if (cart.length === 0) {

    container.innerHTML = `
      <div class="empty">

        <div>🛒</div>

        <h3>
          Your cart is empty
        </h3>

        <p>
          Add something you like.
        </p>

      </div>
    `;

    document.getElementById(
      "cartTotal"
    ).textContent = "₹0";

    return;
  }

  let total = 0;

  container.innerHTML = "";

  cart.forEach(item => {

    const product =
      products.find(
        p => p.id === item.id
      );

    if (!product) return;

    total +=
      product.price * item.qty;

    const div =
      document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `

      <div class="cart-icon">
        ${product.emoji}
      </div>

      <div class="cart-details">

        <h4>
          ${product.name}
        </h4>

        <strong>
          ${money(product.price)}
        </strong>

        <div class="qty">

          <button
            onclick="changeQuantity(
              ${product.id}, -1
            )">

            −

          </button>

          <span>
            ${item.qty}
          </span>

          <button
            onclick="changeQuantity(
              ${product.id}, 1
            )">

            +

          </button>

          <button
            onclick="removeFromCart(
              ${product.id}
            )">

            🗑

          </button>

        </div>

      </div>
    `;

    container.appendChild(div);

  });

  document.getElementById(
    "cartTotal"
  ).textContent =
    money(total);
}


function openCart() {

  renderCart();

  document
    .getElementById("cartDrawer")
    .classList.add("open");

  document
    .getElementById("overlay")
    .classList.remove("hidden");
}


function closeCart() {

  document
    .getElementById("cartDrawer")
    .classList.remove("open");

  document
    .getElementById("overlay")
    .classList.add("hidden");
}


function openProduct(id) {

  const product =
    products.find(
      p => p.id === id
    );

  if (!product) return;

  document.getElementById(
    "modalContent"
  ).innerHTML = `

    <div class="modal-product">

      <div class="modal-image">
        ${product.emoji}
      </div>

      <div class="modal-info">

        <div class="product-category">
          ${product.category}
        </div>

        <h2>
          ${product.name}
        </h2>

        <div class="rating">
          ★ ${product.rating} / 5
        </div>

        <div class="price">
          ${money(product.price)}
        </div>

        <p>
          ${product.description}
        </p>

        <br>

        <button
          class="add-btn"
          onclick="
            addToCart(${product.id});
            closeModal();
          ">

          Add to Cart

        </button>

      </div>

    </div>
  `;

  document
    .getElementById("productModal")
    .classList.remove("hidden");

  document
    .getElementById("overlay")
    .classList.remove("hidden");
}


function closeModal() {

  document
    .getElementById("productModal")
    .classList.add("hidden");

  document
    .getElementById("overlay")
    .classList.add("hidden");
}


function toggleWishlist(id) {

  if (wishlist.includes(id)) {

    wishlist =
      wishlist.filter(
        item => item !== id
      );

    showMessage(
      "Removed from wishlist"
    );

  } else {

    wishlist.push(id);

    showMessage(
      "Added to wishlist ❤️"
    );
  }

  localStorage.setItem(
    "auWishlist",
    JSON.stringify(wishlist)
  );

  renderProducts();
}


function openWishlist() {

  const saved =
    products.filter(
      p => wishlist.includes(p.id)
    );

  if (saved.length === 0) {

    alert(
      "Your wishlist is empty ❤️"
    );

    return;
  }

  visibleProducts = saved;

  document.getElementById(
    "sectionTitle"
  ).textContent =
    "Your wishlist";

  renderProducts();

  scrollToProducts();
}


function checkout() {

  if (cart.length === 0) {

    alert(
      "Your cart is empty."
    );

    return;
  }

  alert(
    "Checkout is ready for the next stage."
  );
}


function scrollToProducts() {

  document
    .getElementById(
      "productsSection"
    )
    .scrollIntoView({
      behavior: "smooth"
    });
}


function resetProducts() {

  visibleProducts =
    [...products];

  document.getElementById(
    "sectionTitle"
  ).textContent =
    "Trending products";

  renderProducts();
}


function goHome() {

  visibleProducts =
    [...products];

  document.getElementById(
    "sectionTitle"
  ).textContent =
    "Trending products";

  document.getElementById(
    "searchInput"
  ).value = "";

  renderProducts();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function closeAll() {

  closeCart();
  closeModal();
}


function showMessage(message) {

  const notification =
    document.createElement("div");

  notification.textContent =
    message;

  notification.style.position =
    "fixed";

  notification.style.bottom =
    "25px";

  notification.style.left =
    "50%";

  notification.style.transform =
    "translateX(-50%)";

  notification.style.background =
    "#101828";

  notification.style.color =
    "white";

  notification.style.padding =
    "13px 20px";

  notification.style.borderRadius =
    "10px";

  notification.style.zIndex =
    "999";

  notification.style.fontWeight =
    "700";

  document.body.appendChild(
    notification
  );

  setTimeout(() => {
    notification.remove();
  }, 1800);
}


updateCartCount();
renderProducts();
