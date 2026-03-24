import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

export default function ProductItem({ product }) {
  const dispatch = useDispatch();

  return (
   <div className="bg-white rounded-2xl shadow hover:shadow-2xl transition p-4 hover:-translate-y-1">

  <img
    src={product.thumbnail}
    className="h-44 w-full object-cover rounded-lg"
  />

  <h2 className="mt-2 font-semibold text-gray-800 line-clamp-1">
    {product.title}
  </h2>

  <p className="text-green-600 font-bold text-lg">${product.price}</p>

  <div className="flex justify-between mt-3">
    <Link
      to={`/product/${product.id}`}
      className="text-blue-500 text-sm"
    >
      View Details
    </Link>

    <button
      onClick={() => dispatch(addToCart(product))}
      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm"
    >
      Add
    </button>
  </div>
</div>
  );
}