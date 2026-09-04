document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navbar = document.querySelector('.navbar');
  const cartBtn = document.getElementById('cartBtn');
  const floatingCart = document.getElementById('floatingCart');
  const cartSidebar = document.getElementById('cartSidebar');
  const closeCart = document.getElementById('closeCart');
  const overlay = document.getElementById('overlay');
  const backToTop = document.getElementById('backToTop');
  const productsGrid = document.getElementById('productsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  const newsletterForm = document.getElementById('newsletterForm');

  // State
  let cart = JSON.parse(localStorage.getItem('bulinkyCart')) || [];
  let products = [];

  // Initialize
  init();

  function init() {
    loadProducts();
    setupEventListeners();
    updateCartUI();
    checkScroll();
  }

  function setupEventListeners() {
    // Mobile menu toggle
    menuToggle.addEventListener('click', toggleMobileMenu);

    // Cart sidebar toggle
    cartBtn.addEventListener('click', openCartSidebar);
    floatingCart.addEventListener('click', openCartSidebar);
    closeCart.addEventListener('click', closeCartSidebar);
    overlay.addEventListener('click', closeCartSidebar);

    // Back to top button
    window.addEventListener('scroll', checkScroll);
    backToTop.addEventListener('click', scrollToTop);

    // Filter buttons
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProducts(btn.dataset.filter);
      });
    });

    // Newsletter form
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          closeMobileMenu();
        }
      });
    });
  }

  function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    menuToggle.innerHTML = mobileMenu.classList.contains('active')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  }

  function openCartSidebar() {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function checkScroll() {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function loadProducts() {
    products = [
      {
        id: 1,
        name: 'Classic Denim Jacket',
        price: 89.99,
        category: 'men',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        rating: 4.5
      },
      {
        id: 2,
        name: 'Elegant Silk Dress',
        price: 129.99,
        category: 'women',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        rating: 4.8
      },
      {
        id: 3,
        name: 'Leather Crossbody Bag',
        price: 79.99,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
        rating: 4.3
      },
      {
        id: 4,
        name: 'Slim Fit Chinos',
        price: 59.99,
        category: 'men',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        rating: 4.6
      },
      {
        id: 5,
        name: 'Floral Print Blouse',
        price: 49.99,
        category: 'women',
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        rating: 4.2
      },
      {
        id: 6,
        name: 'Minimalist Watch',
        price: 149.99,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
        rating: 4.9
      },
      {
        id: 7,
        name: 'Cotton T-Shirt',
        price: 29.99,
        category: 'men',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
        rating: 4.7
      },
      {
        id: 8,
        name: 'Maxi Summer Dress',
        price: 99.99,
        category: 'women',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        rating: 4.4
      },
      {
        id: 9,
        name: 'Wool Scarf',
        price: 39.99,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        rating: 4.1
      },
      {
        id: 10,
        name: 'Formal Dress Shirt',
        price: 69.99,
        category: 'men',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        rating: 4.5
      },
      {
        id: 11,
        name: 'Leather Boots',
        price: 179.99,
        category: 'women',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        rating: 4.8
      },
      {
        id: 12,
        name: 'Sunglasses',
        price: 89.99,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
        rating: 4.6
      }
    ];

    renderProducts(products);
  }

  function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';

    productsToRender.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.dataset.category = product.category;

      const ratingStars = getRatingStars(product.rating);

      productCard.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <div class="product-rating">
            ${ratingStars}
            <span>(${product.rating})</span>
          </div>
        </div>
        <button class="add-to-cart" data-id="${product.id}">
          <i class="fas fa-shopping-cart"></i>
        </button>
      `;

      productsGrid.appendChild(productCard);
    });

    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const productId = parseInt(btn.dataset.id);
        addToCart(productId);
      });
    });
  }

  function filterProducts(filter) {
    if (filter === 'all') {
      renderProducts(products);
    } else {
      const filteredProducts = products.filter(product => product.category === filter);
      renderProducts(filteredProducts);
    }
  }

  function getRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '';
    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="far fa-star"></i>';
    }

    return stars;
  }

  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1
      });
    }

    saveCart();
    updateCartUI();
    showAddedToCartNotification(product.name);

    // Open cart sidebar briefly
    openCartSidebar();
    setTimeout(closeCartSidebar, 2000);
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
  }

  function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items display
    if (cart.length === 0) {
      cartItems.innerHTML = `
        <div class="empty-cart">
          <i class="fas fa-shopping-bag"></i>
          <p>Your cart is empty</p>
        </div>
      `;
    } else {
      cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <button class="remove-item" data-id="${item.id}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `).join('');

      // Add event listeners to remove buttons
      document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
          const productId = parseInt(btn.dataset.id);
          removeFromCart(productId);
        });
      });
    }

    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  function saveCart() {
    localStorage.setItem('bulinkyCart', JSON.stringify(cart));
  }

  function showAddedToCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'add-to-cart-notification';
    notification.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>${productName} added to cart!</span>
    `;

    notification.style.position = 'fixed';
    notification.style.bottom = '100px';
    notification.style.right = '30px';
    notification.style.backgroundColor = '#1a1a1a';
    notification.style.color = '#fff';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '10px';
    notification.style.zIndex = '3000';
    notification.style.animation = 'slideIn 0.3s ease-out';

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 2000);
  }

  function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;

    if (email) {
      // In a real application, you would send this to your backend
      alert('Thank you for subscribing! We\'ll keep you updated with our latest collections and offers.');

      // Reset form
      e.target.reset();
    }
  }

  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }

    .category-card:hover {
      transform: translateY(-10px) scale(1.02);
    }

    .product-card:hover {
      transform: translateY(-8px);
    }

    .testimonial-card:hover {
      transform: translateY(-8px);
    }
  `;
  document.head.appendChild(style);
});