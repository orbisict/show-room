// Global Variables
let products = [];
let categories = [];
let companyInfo = {};
let mediaData = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Pagination State
let currentPage = { home: 1, menu: 1 };
let itemsPerPage = { home: 6, menu: 12 };
let filteredProducts = { home: [], menu: [] };

// Slider State
let currentSlide = 0;
let sliderInterval = null;
let sliderPaused = false;

// Toast Notification Function
function showToast(message, type = "success") {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor:
      type === "success" ? "linear-gradient(135deg, #00bcd4, #0288d1)" : "linear-gradient(135deg, #f44336, #d32f2f)",
    stopOnFocus: true,
    className: "toast-notification",
  }).showToast();
}

// Load JSON Data
async function loadData() {
  try {
    const [productsRes, categoriesRes, companyRes, mediaRes] = await Promise.all([
      fetch("./assets/data/product.json"),
      fetch("./assets/data/category.json"),
      fetch("./assets/data/company-info.json"),
      fetch("./assets/data/media.json"),
    ]);

    products = await productsRes.json();
    categories = await categoriesRes.json();
    companyInfo = (await companyRes.json())[0];
    mediaData = await mediaRes.json();

    initializeApp();
  } catch (error) {
    console.error("Error loading data:", error);
    showToast("Không thể tải dữ liệu. Sử dụng dữ liệu mẫu.", "error");
  }
}

// Initialize Application
function initializeApp() {
  loadCompanyInfo();
  loadSlider();
  loadCategories();
  filteredProducts.home = [...products];
  filteredProducts.menu = [...products];
  renderProducts("home");
  updateCartCount();
  showToast("Chào mừng bạn đến với Orbis ICT!");
}

// Load Company Information
function loadCompanyInfo() {
  document.getElementById("company-logo").src = companyInfo["logo-url"] || "";
  document.getElementById("company-name").textContent = companyInfo.name || "";
  document.getElementById("company-slogan").textContent = companyInfo.slogan || "";
  document.getElementById("footer-company-name").textContent = companyInfo.name || "";
  document.getElementById("footer-address").textContent = companyInfo.address || "";
  document.getElementById("footer-email").textContent = companyInfo.email || "";
  document.getElementById("footer-email").href = `mailto:${companyInfo.email}`;
  document.getElementById("footer-website").textContent = companyInfo.website || "";
  document.getElementById("footer-website").href = companyInfo.website || "";

  // Social Links
  const socialLinks = document.getElementById("social-links");
  const social = companyInfo["social-media"] || {};
  socialLinks.innerHTML = `
        ${
          social["facebook-group"]
            ? `<a href="${social["facebook-group"]}" target="_blank" title="Facebook"><i class="fab fa-facebook"></i></a>`
            : ""
        }
        ${
          social.fanpage
            ? `<a href="${social.fanpage}" target="_blank" title="Twitter"><i class="fab fa-twitter"></i></a>`
            : ""
        }
        ${
          social.instagram
            ? `<a href="${social.instagram}" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>`
            : ""
        }
        ${
          social.telegram
            ? `<a href="${social.telegram}" target="_blank" title="Telegram"><i class="fab fa-telegram"></i></a>`
            : ""
        }
        ${
          social.tiktok
            ? `<a href="${social.tiktok}" target="_blank" title="TikTok"><i class="fab fa-tiktok"></i></a>`
            : ""
        }
        ${
          social.threads
            ? `<a href="${social.threads}" target="_blank" title="Threads"><i class="fab fa-threads"></i></a>`
            : ""
        }
        ${social.zalo ? `<a href="${social.zalo}" target="_blank" title="Zalo"><i class="fas fa-comment"></i></a>` : ""}
    `;

  // Contact Info
  const contactInfo = document.getElementById("contact-info");
  contactInfo.innerHTML = `
        <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <div>
                <h4>Email</h4>
                <a href="mailto:${companyInfo.email}">${companyInfo.email}</a>
            </div>
        </div>
        <div class="contact-item">
            <i class="fas fa-globe"></i>
            <div>
                <h4>Website</h4>
                <a href="${companyInfo.website}" target="_blank">${companyInfo.website}</a>
            </div>
        </div>
        <div class="contact-item">
            <i class="fab fa-facebook"></i>
            <div>
                <h4>Facebook Group</h4>
                <a href="${social["facebook-group"]}" target="_blank">Truy cập ngay</a>
            </div>
        </div>
        <div class="contact-item">
            <i class="fab fa-tiktok"></i>
            <div>
                <h4>TikTok</h4>
                <a href="${social.tiktok}" target="_blank">Theo dõi chúng tôi</a>
            </div>
        </div>
        <div class="contact-item">
            <i class="fas fa-comment"></i>
            <div>
                <h4>Zalo</h4>
                <a href="${social.zalo}" target="_blank">Chat ngay</a>
            </div>
        </div>
        <div class="contact-item">
            <i class="fab fa-instagram"></i>
            <div>
                <h4>Instagram</h4>
                <a href="${social.instagram}" target="_blank">Follow Instagram</a>
            </div>
        </div>
    `;
}

// Slider Functions
function loadSlider() {
  const slider = document.getElementById("slider");
  slider.innerHTML = mediaData
    .map(
      (item, index) => `
        <div class="slide ${index === 0 ? "active" : ""}">
            <a href="${item.link}" target="_blank">
                <img src="${item.image}" alt="Banner ${index + 1}">
            </a>
        </div>
    `
    )
    .join("");

  startSlider();
}

function startSlider() {
  sliderInterval = setInterval(() => {
    if (!sliderPaused) {
      currentSlide = (currentSlide + 1) % mediaData.length;
      goToSlide(currentSlide);
    }
  }, 5000);
}

function goToSlide(index) {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  currentSlide = index;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % mediaData.length;
  goToSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + mediaData.length) % mediaData.length;
  goToSlide(currentSlide);
}

function toggleSlider() {
  sliderPaused = !sliderPaused;
  const pauseBtn = document.getElementById("slider-pause");
  pauseBtn.innerHTML = sliderPaused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
}

// Load Categories
function loadCategories() {
  const categoryFilter = document.getElementById("category-filter");
  categoryFilter.innerHTML =
    '<option value="">Tất cả danh mục</option>' +
    categories.map((cat) => `<option value="${cat.name}">${cat.name}</option>`).join("");
}

// Filter Functions
function filterByCategory() {
  const category = document.getElementById("category-filter").value;
  const subcategoryFilter = document.getElementById("subcategory-filter");

  if (category) {
    const cat = categories.find((c) => c.name === category);
    subcategoryFilter.innerHTML =
      '<option value="">Tất cả loại</option>' +
      (cat?.sub || []).map((sub) => `<option value="${sub.name}">${sub.name}</option>`).join("");
  } else {
    subcategoryFilter.innerHTML = '<option value="">Tất cả loại</option>';
  }

  filterBySubcategory();
}

function filterBySubcategory() {
  const category = document.getElementById("category-filter").value;
  const subcategory = document.getElementById("subcategory-filter").value;

  filteredProducts.menu = products.filter((p) => {
    const matchCategory = !category || p.category.name === category;
    const matchSubcategory = !subcategory || p.category.sub === subcategory;
    return matchCategory && matchSubcategory;
  });

  currentPage.menu = 1;
  renderProducts("menu");
  showToast(`Tìm thấy ${filteredProducts.menu.length} sản phẩm`);
}

// Search Function
function searchProducts() {
  const query = document.getElementById("search-input").value.toLowerCase().trim();
  if (!query) {
    showToast("Vui lòng nhập từ khóa tìm kiếm", "error");
    return;
  }

  filteredProducts.home = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.name.toLowerCase().includes(query) ||
      p.category.sub.toLowerCase().includes(query)
  );

  currentPage.home = 1;
  renderProducts("home");
  showPage("home");
  showToast(`Tìm thấy ${filteredProducts.home.length} sản phẩm cho "${query}"`);
}

// Sort Functions
function sortProducts(page) {
  const sortValue = document.getElementById(`sort-${page}`).value;

  filteredProducts[page].sort((a, b) => {
    switch (sortValue) {
      case "price-asc":
        return (a["sale-price"] || a.price) - (b["sale-price"] || b.price);
      case "price-desc":
        return (b["sale-price"] || b.price) - (a["sale-price"] || a.price);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  renderProducts(page);
}

// Change Items Per Page
function changeItemsPerPage(page) {
  itemsPerPage[page] = parseInt(document.getElementById(`items-per-page-${page}`).value);
  currentPage[page] = 1;
  renderProducts(page);
}

// Render Products
function renderProducts(page) {
  const products = filteredProducts[page];
  const start = (currentPage[page] - 1) * itemsPerPage[page];
  const end = start + itemsPerPage[page];
  const pageProducts = products.slice(start, end);

  const container = document.getElementById(`${page}-products`);

  if (pageProducts.length === 0) {
    container.innerHTML =
      '<div class="cart-empty"><i class="fas fa-box-open"></i><p>Không tìm thấy sản phẩm nào</p></div>';
    return;
  }

  container.innerHTML = pageProducts
    .map(
      (p, index) => `
        <div class="product-card" onclick="showProductDetail('${p.id}')" style="animation-delay: ${index * 0.1}s">
            <img src="${p.image}" alt="${p.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <div class="product-name">${p.name}</div>
                <div class="product-price">
                    <span class="sale-price">${p["sale-price"].toLocaleString()}${p.unit}</span>
                    ${
                      p["sale-price"] < p.price
                        ? `<span class="original-price">${p.price.toLocaleString()}${p.unit}</span>`
                        : ""
                    }
                </div>
                <button class="add-to-cart" onclick="addToCart(event, '${p.id}')">
                    <i class="fas fa-shopping-cart"></i> Thêm vào giỏ
                </button>
            </div>
        </div>
    `
    )
    .join("");

  renderPagination(page, products.length);
}

// Render Pagination
function renderPagination(page, totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage[page]);
  const container = document.getElementById(`${page}-pagination`);

  if (totalPages <= 1) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = `
        <button onclick="changePage('${page}', ${currentPage[page] - 1})" ${currentPage[page] === 1 ? "disabled" : ""}>
            <i class="fas fa-chevron-left"></i> Trước
        </button>
        <span>Trang ${currentPage[page]} / ${totalPages}</span>
        <button onclick="changePage('${page}', ${currentPage[page] + 1})" ${
    currentPage[page] >= totalPages ? "disabled" : ""
  }>
            Sau <i class="fas fa-chevron-right"></i>
        </button>
    `;
}

// Change Page
function changePage(page, newPage) {
  currentPage[page] = newPage;
  renderProducts(page);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Cart Functions
function addToCart(event, productId) {
  event.stopPropagation();
  const product = products.find((p) => p.id === productId);

  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity++;
    showToast(`Đã tăng số lượng "${product.name}" trong giỏ hàng`);
  } else {
    cart.push({ ...product, quantity: 1 });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng`);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function removeFromCart(productId) {
  const product = cart.find((item) => item.id === productId);
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
  showToast(`Đã xóa "${product.name}" khỏi giỏ hàng`);
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
}

function renderCart() {
  const container = document.getElementById("cart-items");

  if (cart.length === 0) {
    container.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <p>Giỏ hàng của bạn đang trống</p>
                <button class="add-to-cart" onclick="showPage('menu')" style="max-width: 300px; margin-top: 1rem;">
                    <i class="fas fa-shopping-bag"></i> Tiếp tục mua sắm
                </button>
            </div>
        `;
    return;
  }

  const totalPrice = cart.reduce((sum, item) => sum + item["sale-price"] * item.quantity, 0);

  container.innerHTML =
    cart
      .map(
        (item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p><strong>Số lượng:</strong> ${item.quantity}</p>
                <p class="sale-price">${(item["sale-price"] * item.quantity).toLocaleString()}${item.unit}</p>
            </div>
            <div class="cart-item-actions">
                <button onclick="removeFromCart('${item.id}')">
                    <i class="fas fa-trash"></i> Xóa
                </button>
            </div>
        </div>
    `
      )
      .join("") +
    `
        <div style="margin-top: 2rem; padding: 1.5rem; background: var(--bg-gray); border-radius: 10px;">
            <h3 style="text-align: center; color: var(--text-dark); margin-bottom: 1rem;">
                Tổng cộng: <span class="sale-price">${totalPrice.toLocaleString()}₫</span>
            </h3>
            <button class="add-to-cart contact-order-btn" onclick="showPage('contact')">
                <i class="fas fa-phone"></i> Liên hệ đặt hàng
            </button>
        </div>
    `;
}

// Product Detail
function showProductDetail(productId) {
  const product = products.find((p) => p.id === productId);
  const relatedProducts = products
    .filter(
      (p) => p.category.name === product.category.name && p.category.sub === product.category.sub && p.id !== product.id
    )
    .slice(0, 4);

  const container = document.getElementById("product-detail-content");
  container.innerHTML = `
        <button onclick="window.history.length > 1 ? history.back() : showPage('menu')" class="back-button">
            <i class="fas fa-arrow-left"></i> Quay lại
        </button>
        
        <div class="product-detail-content">
            <div>
                <img src="${product.image}" alt="${product.name}" class="product-detail-image">
            </div>
            <div class="product-detail-info">
                <h1>${product.name}</h1>
                <p>${product.description}</p>
                
                <div class="product-price" style="margin: 2rem 0;">
                    <span class="sale-price">${product["sale-price"].toLocaleString()}${product.unit}</span>
                    ${
                      product["sale-price"] < product.price
                        ? `<span class="original-price">${product.price.toLocaleString()}${product.unit}</span>`
                        : ""
                    }
                </div>
                
                <p><strong>Công ty:</strong> ${product.company} </p>
                <p><strong>Danh mục:</strong> ${product.category.name} - ${product.category.sub}</p>
                
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(event, '${product.id}')" style="flex: 1;">
                        <i class="fas fa-shopping-cart"></i> Thêm vào giỏ
                    </button>
                    <a href="${product.link}" target="_blank" class="preview-link" style="flex: 1;">
                        <i class="fas fa-eye"></i> Xem Preview
                    </a>
                </div>
            </div>
        </div>
        
        ${
          relatedProducts.length > 0
            ? `
            <div style="margin-top: 3rem;">
                <div class="section-header">
                    <h2 class="section-title">Sản phẩm cùng loại</h2>
                    <div class="title-underline"></div>
                </div>
                <div class="products-grid">
                    ${relatedProducts
                      .map(
                        (p) => `
                        <div class="product-card" onclick="showProductDetail('${p.id}')">
                            <img src="${p.image}" alt="${p.name}" class="product-image">
                            <div class="product-info">
                                <div class="product-name">${p.name}</div>
                                <div class="product-price">
                                    <span class="sale-price">${p["sale-price"].toLocaleString()}${p.unit}</span>
                                    ${
                                      p["sale-price"] < p.price
                                        ? `<span class="original-price">${p.price.toLocaleString()}${p.unit}</span>`
                                        : ""
                                    }
                                </div>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        `
            : ""
        }
    `;

  showPage("product-detail");
}

// Show Page
function showPage(pageName) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.add("hidden");
  });

  // Show target page
  const targetPage = document.getElementById(`${pageName}-page`);
  if (targetPage) {
    targetPage.classList.remove("hidden");
  }

  // Update active nav link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  const navLinks = document.querySelectorAll(".nav-link");
  const navMap = { home: 0, menu: 1, cart: 2, contact: 3 };
  if (navMap[pageName] !== undefined && navLinks[navMap[pageName]]) {
    navLinks[navMap[pageName]].classList.add("active");
  }

  // Render cart if needed
  if (pageName === "cart") {
    renderCart();
  }

  // Smooth scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Initialize on DOM Load
window.addEventListener("DOMContentLoaded", () => {
  loadData();

  // Add Enter key support for search
  document.getElementById("search-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchProducts();
    }
  });
});

// Export functions for inline onclick handlers
window.showPage = showPage;
window.searchProducts = searchProducts;
window.sortProducts = sortProducts;
window.changeItemsPerPage = changeItemsPerPage;
window.changePage = changePage;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.showProductDetail = showProductDetail;
window.filterByCategory = filterByCategory;
window.filterBySubcategory = filterBySubcategory;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.toggleSlider = toggleSlider;
