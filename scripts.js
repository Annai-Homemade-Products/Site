// scripts.js

// Load product data from products.json and render them
async function loadProducts(filter = {}) {
  const response = await fetch('products.json');
  const products = await response.json();

  const container = document.querySelector('.product-grid');
  const heading = document.querySelector('.product-section h2');

  if (!container) return;

  let filtered = products;

  // Keyword search
  if (filter.keyword) {
    const kw = filter.keyword.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(kw));
    if (heading) heading.textContent = `Results for "${filter.keyword}"`;
  }

  // Category filter
  if (filter.category) {
    filtered = filtered.filter(p => p.category === filter.category);
    if (heading) heading.textContent = filter.category;
  }

  // Render
  container.innerHTML = '';
  filtered.forEach((product, index) => {
    const item = document.createElement('div');
    item.className = 'product-item';
    item.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}" data-index="${index}" />
      <p>${product.name}</p>

      <!-- Popup -->
      <div class="product-popup" id="popup-${index}">
        <div class="product-popup-content">
          <img src="${product.imageUrl}" alt="${product.name}" />
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p><strong>Price:</strong> ₹${product.price}</p>
        </div>
      </div>
    `;
    container.appendChild(item);
  });

  // Setup click-to-open popup
  document.querySelectorAll('.product-item img').forEach(img => {
    img.addEventListener('click', () => {
      const index = img.getAttribute('data-index');
      const popup = document.getElementById(`popup-${index}`);
      popup.style.display = 'flex';
    });
  });

  // Setup click-outside-to-close popup
  document.querySelectorAll('.product-popup').forEach(popup => {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.style.display = 'none';
      }
    });
  });
}

// Parse query parameters (e.g., ?keyword=rose or ?type=Powders)
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get('keyword');
  const category = params.get('type');
  return { keyword, category };
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.product-grid')) {
    const filters = getQueryParams();
    loadProducts(filters);
  }
});
