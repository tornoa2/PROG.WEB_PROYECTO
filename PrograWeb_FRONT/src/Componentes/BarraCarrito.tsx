import CartItemCard from "./CartItemCard";
import "../Estilos/NavBar.css";

type CartBarProps = {
  cartItems: { name: string }[];
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
  onClearCart: () => void;
  isVisible: boolean;
};

const CartBar = ({
  cartItems,
  onRemoveItem,
  onCheckout,
  onClearCart,
  isVisible,
}: CartBarProps) => {
  if (!isVisible) return null;

  return (
    <div
      className="position-fixed bottom-0 start-0 end-0 text-white p-3"
      style={{
        zIndex: 1050,
        backgroundColor: "#0f0f1e",
        borderTop: "3px solid #00fff7",
        fontFamily: "Pixel",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <strong className="text-neon">🛒 Carrito:</strong>
            <div
              className="mb-3 d-flex gap-2"
              style={{
                overflowX: "auto",
                whiteSpace: "nowrap",
                flexWrap: "nowrap",
              }}
            >
              {cartItems.length === 0 ? (
                <span className="text-muted">No hay productos aún</span>
              ) : (
                cartItems.map((item, index) => (
                  <CartItemCard
                    key={index}
                    name={item.name}
                    onRemove={() => onRemoveItem(index)}
                  />
                ))
              )}
            </div>
          </div>
          <div className="col-12 text-center mt-2">
            <button
              className="btn-outline-neon"
              onClick={onCheckout}
            >
              ✅ Comprar Ahora
            </button>
            <button
              className="btn-outline-neon"
              onClick={onClearCart}
            >
              ❌ Vaciar Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartBar;
