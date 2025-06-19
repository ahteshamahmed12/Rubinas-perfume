'use client';

import { useEffect, useState } from 'react';

function CartIndicator() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '{}');
      const items = Object.values(cart) as any[];
      const total = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(total);
    } catch (error) {
      console.error('Error parsing cart:', error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCartCount();

    const handler = () => updateCartCount();

    window.addEventListener('cartUpdated', handler);
    window.addEventListener('storage', handler);

    return () => {
      window.removeEventListener('cartUpdated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  if (cartCount === 0) return null;

  return (
    <div className="absolute right-1 bg-red-500 text-white rounded-full text-xs px-2 py-0.5">
      {cartCount}
    </div>
  );
}

export default CartIndicator;
