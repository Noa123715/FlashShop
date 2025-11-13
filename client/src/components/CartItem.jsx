import React from "react";

export default function CartItem({ item, onRemove }) {
  const lineItemTotal = item.price * item.quantity;

  return (
    <div className="p-4 grid grid-cols-6 gap-4 items-center">
      
      {/* --- THIS IS THE UPDATED SECTION --- */}
      {/* Layout is now [X] [Image] [Name] */}
      <div className="col-span-6 sm:col-span-3 flex items-center gap-4">
        
        {/* 1. The 'X' Button (moved here) */}
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 text-xl font-bold p-2"
          aria-label={`הסר ${item.name}`}
        >
          X
        </button>

        {/* 2. The Image */}
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md border"
        />
        
        {/* 3. The Name (no longer in a wrapper div) */}
        <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
      </div>
      {/* --- END OF UPDATE --- */}


      {/* Price (Mobile Label) */}
      <div className="col-span-3 sm:hidden text-gray-600">מחיר ליחידה:</div>
      <div className="col-span-3 sm:col-span-1 sm:text-center text-gray-700">
        {item.price.toFixed(2)} ש"ח
      </div>

      {/* Quantity (Mobile Label) */}
      <div className="col-span-3 sm:hidden text-gray-600">כמות:</div>
      <div className="col-span-3 sm:col-span-1 sm:text-center text-gray-700">
        {item.quantity}
      </div>

      {/* Total (Mobile Label) */}
      <div className="col-span-3 sm:hidden text-gray-600">סה"כ:</div>
      <div className="col-span-3 sm:col-span-1 sm:text-center font-semibold text-gray-900">
        {lineItemTotal.toFixed(2)} ש"ח
      </div>
    </div>
  );
}