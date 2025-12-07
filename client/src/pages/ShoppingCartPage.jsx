import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import RecommendedProduct from "../components/RecommendedProduct";
import { useCartStore } from "../store/cartStore";
import useAuthStore from "../store/authStore";
import { checkCouponRequest } from "../api/club";
import { getProducts } from "../api/products";

export default function ShoppingCartPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart); // Get addToCart action
  
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  const [discount, setDiscount] = useState(0); 
  const [appliedCoupon, setAppliedCoupon] = useState("");
  
  const [allProducts, setAllProducts] = useState([]); // Store all DB products
  const [recommendedProducts, setRecommendedProducts] = useState([]); // Store currently displayed

  // 1. Fetch products from DB on mount
  useEffect(() => {
    getProducts().then((data) => {
      setAllProducts(data);
      setRecommendedProducts(getRandomProducts(data, 3));
    }).catch(err => console.error("Failed to load products:", err));
  }, []);

  // Helper to pick n random products
  const getRandomProducts = (productsList, count) => {
    if (!productsList || productsList.length === 0) return [];
    // Create a shallow copy and shuffle
    const shuffled = [...productsList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // 2. Handle adding a recommended product to cart
  const handleAddToCartRecommended = (product) => {
    const newItem = {
      id: product._id, // Use DB _id
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    addToCart([newItem]); // Add to store
    
    // 3. Change the recommendations after adding
    setRecommendedProducts(getRandomProducts(allProducts, 3));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalPrice = Math.max(0, subtotal - discount);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
        alert("העגלה ריקה!");
        return;
    }

    if (!isAuthenticated) {
        if (confirm("עליך להתחבר כדי להמשיך לתשלום. לעבור להתחברות?")) {
            navigate('/login', { state: { from: '/cart' } });
        }
        return;
    }

    console.log("Proceeding to checkout...", { 
        items: cartItems, 
        total: totalPrice, 
        coupon: appliedCoupon 
    });
    alert("מעבר לתשלום...");
  };

  const handleCoupon = async (code) => {
    if (!code) return { success: false, msg: "נא להזין קוד" };
    
    if (appliedCoupon === code) return { success: false, msg: "קופון זה כבר הוזן" };

    const result = await checkCouponRequest(code);

    if (result.valid) {
        let discountAmount = 0;

        if (result.discountType === 'percent') {
            discountAmount = subtotal * (result.discountValue / 100);
        } else if (result.discountType === 'fixed') {
            discountAmount = result.discountValue;
        }

        discountAmount = Math.min(discountAmount, subtotal);

        setDiscount(discountAmount);
        setAppliedCoupon(code);
        return { success: true, msg: result.msg || `קופון התקבל! חסכת ${discountAmount.toFixed(2)} ש"ח` };
    } else {
        setDiscount(0);
        setAppliedCoupon("");
        return { success: false, msg: result.msg || "קופון לא תקין" };
    }
  };

  return (
    <div className="bg-white min-h-screen relative overflow-x-hidden">
      
      <header className="relative h-48 md:h-64 flex items-center justify-center mb-8">
        <img
          src="https://c.animaapp.com/ssXwMPGd/img/vector-6.png"
          alt="Header"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <h1 className="text-5xl md:text-6xl font-bold text-white z-10 relative">
          עגלת קניות
        </h1>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <main className="flex-grow lg:w-2/3 bg-gray-50 rounded-lg shadow-md border">
            <div className="p-4 bg-[#f2665e] rounded-t-lg">
              <h2 className="text-xl font-semibold text-white">
                יש לי {totalItems} פריטים בסל
              </h2>
            </div>
            
            <div className="hidden md:grid grid-cols-6 gap-4 p-4 font-semibold text-gray-600 border-b">
              <div className="col-span-3">פריט</div>
              <div className="col-span-1 text-center">מחיר</div>
              <div className="col-span-1 text-center">כמות</div>
              <div className="col-span-1 text-center">סה"כ</div>
            </div>

            <div className="divide-y divide-gray-200">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={handleRemoveItem}
                  />
                ))
              ) : (
                <p className="p-12 text-center text-gray-500 text-lg">
                  העגלה שלך ריקה.
                </p>
              )}
            </div>
          </main>

          <aside className="lg:w-1/3">
            <CartSummary
              subtotal={subtotal}
              discount={discount}
              totalPrice={totalPrice}
              onCheckout={handleCheckout}
              onCoupon={handleCoupon}
            />
          </aside>
        </div>

        <img
          className="absolute w-full top-1/2 left-0 -z-10 opacity-60 pointer-events-none"
          alt="Wavy background"
          src="https://c.animaapp.com/ssXwMPGd/img/vector.svg"
        />

        <section className="mt-16 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#f2665e] mb-8">
            אולי תאהבו גם את אלה...
          </h2>
          {recommendedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {recommendedProducts.map((product) => (
                <RecommendedProduct 
                    key={product._id} 
                    product={product} 
                    onAddToCart={handleAddToCartRecommended} 
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">טוען מוצרים מומלצים...</p>
          )}
        </section>
      </div>
    </div>
  );
}