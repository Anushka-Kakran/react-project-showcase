import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../redux/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white shadow p-4 rounded flex justify-between items-center">

      {/* Info */}
      <div>
        <h2 className="font-semibold">{item.title}</h2>
        <p className="text-green-600">${item.price}</p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => dispatch(decreaseQty(item.id))}
          className="px-2 bg-gray-300 rounded"
        >
          -
        </button>

        <span>{item.quantity}</span>

        <button
          onClick={() => dispatch(increaseQty(item.id))}
          className="px-2 bg-gray-300 rounded"
        >
          +
        </button>
      </div>

      {/* Remove */}
      <button
        onClick={() => dispatch(removeFromCart(item.id))}
        className="text-red-500"
      >
        Remove
      </button>
    </div>
  );
}