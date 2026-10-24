
import { useEffect, useState } from "react";
import "./App.css";

type Category = "Stuffed Toys" | "Beauty" | "Accessories" | "Cologne";

type Product = {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Cute Panda Plushie",
    category: "Stuffed Toys",
    price: 299,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTirpKcjFtWSn3bk6X4QwEpbYs6vNwMJZ8BZGoPGw_cbQ&s=10",
    description: "A soft, cuddly panda plushie perfect for gifts and room decor.",
  },
  {
    id: 2,
    name: "Blue Alien Plushie",
    category: "Stuffed Toys",
    price: 349,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFozOcpaILVG9wQL8A4qC-IBr3AxG-RCx7KdfCvdisxg&s=10",
    description: "A cute blue alien-inspired plush toy for your collection.",
  },
  {
    id: 3,
    name: "Kawaii Bear Plush",
    category: "Stuffed Toys",
    price: 249,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ56sOsRI1ZtjeEehb-zr8jCMsAcTnVbXbFkjg9etfWTQ&s=10",
    description: "An adorable soft teddy bear for hugs and gifts.",
  },
  {
    id: 4,
    name: "Beauty Care Set",
    category: "Beauty",
    price: 499,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbdj3JqzpHJYCFotHh_6_i0-1Szy2ar-XG-USgmpIQ1g&s=10",
    description: "A beauty care collection for your everyday self-care routine.",
  },
  {
    id: 5,
    name: "Lip Gloss Collection",
    category: "Beauty",
    price: 199,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-rKymmyOz4YUUVXetS7_AJS3ueA5fLaKX_ANxj86XoQ&s=10",
    description: "Glossy lip color for a fresh everyday look.",
  },
  {
    id: 6,
    name: "Skin Care Essentials",
    category: "Beauty",
    price: 399,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkgIbRjSMTOQ6fgfpv2flIPyv9oVIHfFpYpjocHXYxPg&s=10",
    description: "Skin care essentials for your daily beauty routine.",
  },
  {
    id: 7,
    name: "Wireless Headphones",
    category: "Accessories",
    price: 799,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhTTZe9v_McYWcK8SdzREUMt2svXZa2qrR4rR4CHkN4Q&s=10",
    description: "Stylish headphones for music, videos, and everyday use.",
  },
  {
    id: 8,
    name: "Fast Charging Cable",
    category: "Accessories",
    price: 149,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXi-93Sfm4FUlRLVI_UlkDcETTdtxYtkP8ivpVyRAC9A&s=10",
    description: "A convenient charging cable for your everyday devices.",
  },
  {
    id: 9,
    name: "Portable Charger",
    category: "Accessories",
    price: 599,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThDpzeRCpY8gCwteDTMAI7mls-tq5Y7Z4gjSo_TjvdRA&s=10",
    description: "A handy power bank to keep your devices charged on the go.",
  },
  {
    id: 10,
    name: "Sweet Bloom Cologne",
    category: "Cologne",
    price: 349,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcIGnCQahBHXOLJ_XIUevMHKv68_me6kHw-fWJ8EmUHA&s=10",
    description: "A lovely fragrance for everyday wear.",
  },
  {
    id: 11,
    name: "Midnight Oud Cologne",
    category: "Cologne",
    price: 599,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeLxVMz84fV76adYlqg6FTesmSXn3VHjcNagcLClqAJw&s=10",
    description: "A bold, warm fragrance for evenings and special occasions.",
  },
  {
    id: 12,
    name: "Fresh Day Perfume",
    category: "Cologne",
    price: 449,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3TLVBtJ-dVHP3_bkatOSH4eFhvmvLVIv1gKDaNUj1hQ&s",
    description: "A fresh fragrance for a clean, confident feeling.",
  },
];

const featuredProducts = [products[0], products[3], products[6], products[9]];

const categories = [
  "All",
  "Stuffed Toys",
  "Beauty",
  "Accessories",
  "Cologne",
] as const;

type CategoryFilter = (typeof categories)[number];

function formatPrice(price: number) {
  return `₱${price.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function App() {
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>("All");
  const [search, setSearch] = useState("");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");

  // Automatically change the featured product every 3 seconds.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setFeaturedIndex((current) => (current + 1) % featuredProducts.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { product, quantity: 1 }];
    });

    setNotice(`${product.name} added to your cart!`);
    window.setTimeout(() => setNotice(""), 2200);
  }

  function changeQuantity(productId: number, amount: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId: number) {
    setCart((current) =>
      current.filter((item) => item.product.id !== productId)
    );
  }

  function checkout() {
    if (cart.length === 0) return;

    setCart([]);
    setCartOpen(false);
    setNotice("Thank you for shopping with Purple Panda Shop! 💜");
    window.setTimeout(() => setNotice(""), 3500);
  }

  const featuredProduct = featuredProducts[featuredIndex];

  return (
    <div className="shop-app">
      <div className="announcement">
        💜 A little happiness in every order — welcome to Purple Panda Shop!
      </div>

      <header className="site-header">
        <button
          className="brand"
          onClick={() => {
            setActiveCategory("All");
            setSearch("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="Purple Panda Shop home"
        >
          <span className="brand-icon">🐼</span>
          <span>
            <strong>Neisha's Cozy Corner</strong>
            <small>SHOP • GIFTS • GOOD VIBES</small>
          </span>
        </button>

        <div className="header-search">
          <span>⌕</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search toys, beauty, accessories..."
            aria-label="Search products"
          />
        </div>

        <button className="cart-button" onClick={() => setCartOpen(true)}>
          <span>🛒</span> Your Cart
          <span className="cart-badge">{cartCount}</span>
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">YOUR HAPPY PLACE ✨</span>
            <h1>
              Cute finds.
              <br />
              <span>Good vibes.</span>
              <br />
              Great prices.
            </h1>
            <p>
              From cuddly plushies to beauty must-haves, tech accessories, and
              lovely fragrances — find something you'll love.
            </p>
            <button
              className="primary-button"
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Shop all products <span>→</span>
            </button>
            <div className="hero-perks">
              <span>💜 Cute finds</span>
              <span>🎁 Gift-ready picks</span>
              <span>✨ Everyday essentials</span>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-circle">
              <span className="floating-emoji emoji-one">💜</span>
              <span className="floating-emoji emoji-two">✨</span>
              <span className="floating-emoji emoji-three">🎀</span>
              <div className="hero-panda">🐼</div>
              <div className="hero-sticker">LOVE IT<br />OR GIFT IT!</div>
            </div>
          </div>
        </section>

        <section className="featured-section" aria-label="Featured products">
          <div className="section-heading">
            <div>
              <span className="eyebrow">HANDPICKED FOR YOU</span>
              <h2>Featured Finds <span>💜</span></h2>
              <p>New favorites, picked just for you.</p>
            </div>
            <div className="slide-controls">
              <span>
                {featuredIndex + 1} / {featuredProducts.length}
              </span>
              <button
                aria-label="Previous featured product"
                onClick={() =>
                  setFeaturedIndex(
                    (current) =>
                      (current - 1 + featuredProducts.length) %
                      featuredProducts.length
                  )
                }
              >
                ←
              </button>
              <button
                aria-label="Next featured product"
                onClick={() =>
                  setFeaturedIndex(
                    (current) => (current + 1) % featuredProducts.length
                  )
                }
              >
                →
              </button>
            </div>
          </div>

          <div className="featured-card">
            <div className="featured-image-wrap">
              <img
                key={featuredProduct.id}
                className="featured-image"
                src={featuredProduct.image}
                alt={featuredProduct.name}
              />
              <span className="featured-label">⭐ FEATURED FIND</span>
            </div>

            <div className="featured-info">
              <span className="product-category">{featuredProduct.category}</span>
              <h3>{featuredProduct.name}</h3>
              <p>{featuredProduct.description}</p>
              <strong className="featured-price">
                {formatPrice(featuredProduct.price)}
              </strong>
              <button
                className="primary-button"
                onClick={() => addToCart(featuredProduct)}
              >
                🛒 Add to cart
              </button>
              <div className="slide-dots" aria-label="Choose featured product">
                {featuredProducts.map((product, index) => (
                  <button
                    key={product.id}
                    className={index === featuredIndex ? "active" : ""}
                    aria-label={`Show ${product.name}`}
                    onClick={() => setFeaturedIndex(index)}
                  />
                ))}
              </div>
              <small className="auto-slide-note">
                ✨ Slides automatically every 3 seconds
              </small>
            </div>
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading simple-heading">
            <div>
              <span className="eyebrow">BROWSE YOUR FAVORITES</span>
              <h2>Shop by Category</h2>
            </div>
          </div>

          <div className="category-grid">
            <button
              className={`category-card ${
                activeCategory === "Stuffed Toys" ? "selected" : ""
              }`}
              onClick={() => setActiveCategory("Stuffed Toys")}
            >
              <span>🧸</span>
              <strong>Stuffed Toys</strong>
              <small>Huggable happiness</small>
            </button>
            <button
              className={`category-card ${
                activeCategory === "Beauty" ? "selected" : ""
              }`}
              onClick={() => setActiveCategory("Beauty")}
            >
              <span>💄</span>
              <strong>Beauty</strong>
              <small>Your daily glow</small>
            </button>
            <button
              className={`category-card ${
                activeCategory === "Accessories" ? "selected" : ""
              }`}
              onClick={() => setActiveCategory("Accessories")}
            >
              <span>🎧</span>
              <strong>Accessories</strong>
              <small>Everyday essentials</small>
            </button>
            <button
              className={`category-card ${
                activeCategory === "Cologne" ? "selected" : ""
              }`}
              onClick={() => setActiveCategory("Cologne")}
            >
              <span>🌸</span>
              <strong>Cologne</strong>
              <small>Find your scent</small>
            </button>
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading products-heading">
            <div>
              <span className="eyebrow">YOUR NEXT FAVORITE IS HERE</span>
              <h2>All Products <span>🛍️</span></h2>
              <p>Explore the collection and add your favorites to your cart.</p>
            </div>
            <label className="category-select-label">
              <span>Category</span>
              <select
                value={activeCategory}
                onChange={(event) =>
                  setActiveCategory(event.target.value as CategoryFilter)
                }
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image-wrap">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />
                    <span className="product-tag">{product.category}</span>
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-card-bottom">
                      <strong>{formatPrice(product.price)}</strong>
                      <button
                        className="add-button"
                        onClick={() => addToCart(product)}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-products">
              <span>🔎</span>
              <h3>No products found</h3>
              <p>Try another search or choose a different category.</p>
              <button
                className="primary-button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
              >
                Show all products
              </button>
            </div>
          )}
        </section>

        <section className="bottom-banner">
          <span>💜</span>
          <div>
            <h2>A little treat goes a long way.</h2>
            <p>Find something cute, useful, or special today.</p>
          </div>
          <button
            className="light-button"
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore the shop →
          </button>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">🐼Neisha's Cozy Corner</div>
        <p>Little things. Big smiles. Made for your everyday joy. 💜</p>
      </footer>

      {notice && (
        <div className="toast-message" role="status">
          <span>💜</span> {notice}
        </div>
      )}

      {cartOpen && (
        <div
          className="cart-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCartOpen(false);
          }}
        >
          <section
            className="cart-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <div className="cart-modal-header">
              <div>
                <span className="eyebrow">YOUR  PICKS</span>
                <h2 id="cart-title">Your Cart 🛒</h2>
                <p>
                  {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
                </p>
              </div>
              <button
                className="close-button"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            {cart.length > 0 ? (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.product.id}>
                      <img src={item.product.image} alt={item.product.name} />
                      <div className="cart-item-info">
                        <h3>{item.product.name}</h3>
                        <span>{formatPrice(item.product.price)}</span>
                        <div className="quantity-controls">
                          <button
                            onClick={() => changeQuantity(item.product.id, -1)}
                            aria-label={`Decrease ${item.product.name} quantity`}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => changeQuantity(item.product.id, 1)}
                            aria-label={`Increase ${item.product.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item.product.id)}
                        aria-label={`Remove ${item.product.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="subtotal-row">
                    <span>Subtotal</span>
                    <strong>{formatPrice(cartTotal)}</strong>
                  </div>
                  <small>Delivery fees, if applicable, are not included.</small>
                  <button className="checkout-button" onClick={checkout}>
                    Complete Purchase · {formatPrice(cartTotal)}
                  </button>
                  <button
                    className="continue-button"
                    onClick={() => setCartOpen(false)}
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <span>🛍️</span>
                <h3>Your cart is waiting for some love!</h3>
                <p>Add a cute find or everyday essential to get started.</p>
                <button
                  className="primary-button"
                  onClick={() => {
                    setCartOpen(false);
                    document
                      .getElementById("products")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Start shopping
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
