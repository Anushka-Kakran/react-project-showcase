import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div className="w-60 bg-white rounded-lg shadow-md p-3 flex flex-col">

      {/* Image */}
      <img
        src={book.image}
        alt={book.title}
        className="h-40 w-full object-cover rounded-md"
      />

      {/* Text Content */}
      <div className="mt-3 flex flex-col gap-1">

        {/* Title */}
        <h3 className="text-md font-semibold text-gray-800 line-clamp-2">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-sm text-gray-500">
          {book.author}
        </p>

        {/* Category */}
        <p className="text-xs text-gray-400">
          {book.category}
        </p>

        {/* Rating */}
        <p className="text-sm text-yellow-500">
          ⭐ {book.rating || "N/A"}
        </p>
      </div>

      {/* Button */}
      <Link
        to={`/book/${book.id}`}
        className="mt-3 text-center bg-blue-600 text-white py-1.5 rounded-md text-sm hover:bg-blue-900 transition"
      >
        View Details
      </Link>
    </div>
  );
}