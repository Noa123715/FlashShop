import React, { useState } from "react";

export default function CartSummary({ totalPrice, onCheckout, onCoupon }) {
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    if (couponCode) {
      onCoupon(couponCode);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 sticky top-8">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-3 text-gray-800">
        סיכום הזמנה
      </h2>
      
      {/* Total Price */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg text-gray-700">סה"כ לתשלום:</span>
        <span className="text-2xl font-bold text-[#f2665e]">
          {totalPrice.toFixed(2)} ש"ח
        </span>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className="w-full bg-[#f2665e] text-white font-bold py-3 rounded-md hover:opacity-90 transition-opacity text-lg mb-4"
        aria-label="רוצה לשלם"
      >
        רוצה לשלם
      </button>

      {/* Coupon Area */}
      <div className="space-y-2">
        <label htmlFor="coupon" className="text-sm font-medium text-gray-600">
          הזן קוד קופון:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="coupon"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="יש לי קופון"
            className="flex-grow p-2 border border-gray-300 rounded-md text-right"
          />
          <button
            onClick={handleApplyCoupon}
            className="bg-gray-200 text-gray-700 font-semibold px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            החל
          </button>
        </div>
      </div>
    </div>
  );
}