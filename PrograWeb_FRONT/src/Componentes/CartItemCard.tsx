type CartItemCardProps = {
  name: string;
  onRemove: () => void;
};

const CartItemCard = ({ name, onRemove }: CartItemCardProps) => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="navbar-freaky"
      >
        <button
          className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 py-1 px-1"
          style={{ lineHeight: 1, fontSize: '0.75rem' }}
          onClick={onRemove}
        >
          ×
        </button>
        <div className="dropdown-menu.border-neon">
          <img
            src="/public/assests/carrusel/readdead2.jpg"
            alt={name}
            style={{ height: 80 }}
            className="mb-2 w-100 object-fit-contain rounded"
          />
          <div style={{ fontSize: '0.85rem' }}>{name}</div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
