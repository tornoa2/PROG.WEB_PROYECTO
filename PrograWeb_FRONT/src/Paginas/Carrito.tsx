import React, { useState } from 'react';
import DummyGC from '../Componentes/DummyGameCard';
import CartBar from '../Componentes/BarraCarrito';
import NavBar from '../Componentes/BarraNavegacion';

type CartItem = {
  name: string;
};

const CartTestPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartVisible, setIsCartVisible] = useState(true);

  const addToCart = (name: string) => {
    setCartItems([...cartItems, { name }]);
    setIsCartVisible(true);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const clearCart = () => setCartItems([]);

  const checkout = () => {
  const resumen: { [name: string]: number } = {};

  cartItems.forEach(item => {
    resumen[item.name] = (resumen[item.name] || 0) + 1;
  });

  const mensaje = Object.entries(resumen)
    .map(([name, cantidad]) => `${name}${cantidad > 1 ? ` x${cantidad}` : ''}`)
    .join(', ');

  alert(`Checkout no implementado aún. Juegos: ${mensaje}`);
};


  const toggleCart = () => setIsCartVisible(!isCartVisible);

  return (
    <>
      <NavBar />
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center"
        style={{ minHeight: '100vh', backgroundColor: '#0d0d1d' }}
      >
        <h2 className="text-neon" >
          ¿Cuál vas a comprar?
        </h2>

        <DummyGC name="Red Dead 2" onAddToCart={addToCart} />

        <button
          className="btn btn-outline-info mt-4"
          onClick={toggleCart}
        >
          🛒 Ver Carrito
        </button>
      </div>

      <CartBar
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onCheckout={checkout}
        onClearCart={clearCart}
        isVisible={isCartVisible}
      />
    </>
  );
};

export default CartTestPage;
