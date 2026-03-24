import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../redux/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 flex justify-between items-center mb-2">

      {/* Product Info */}
      <div>
        <h2 className="font-bold">{item.title}</h2>
        <p>₹ {item.price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => dispatch(decreaseQty(item.id))}
          className="px-2 bg-gray-300"
        >
          -
        </button>

        <span>{item.quantity}</span>

        <button
          onClick={() => dispatch(increaseQty(item.id))}
          className="px-2 bg-gray-300"
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => dispatch(removeFromCart(item.id))}
        className="bg-red-500 text-white px-3 py-1"
      >
        Remove
      </button>
    </div>
  );
}