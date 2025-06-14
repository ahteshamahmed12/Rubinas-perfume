'use client';

import { useEffect, useState } from 'react';

function CartIndicator() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const items = Object.values(cart) as any[];
    const total = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartCount(total);
  };

  useEffect(() => {
    updateCartCount();

    // Custom event from add-to-cart logic
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  if (cartCount === 0) return null;

  return (
    <div className="absolute   bg-red-500 text-white rounded-full text-xs px-2 py-0.5">
      {cartCount}
    </div>
  );
}

export default CartIndicator;
