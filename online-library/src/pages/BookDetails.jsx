import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BookDetails() {
  const { id } = useParams();
  const books = useSelector((state) => state.books);

  const book = books.find((b) => b.id == id);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-red-500">
          Book Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-2xl max-w-3xl w-full p-6 grid md:grid-cols-2 gap-6">

        {/* Book Image */}
        <div className="flex justify-center items-center">
          <img
            src={book.image}
            alt={book.title}
            className="w-64 h-80 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Book Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {book.title}
            </h1>

            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Author:</span> {book.author}
            </p>

            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Category:</span> {book.category}
            </p>

            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Rating:</span> ⭐ {book.rating}
            </p>

            <p className="text-gray-700 leading-relaxed">
              {book.description}
            </p>
          </div>

          {/* Back Button */}
          <Link
            to={`/books/${book.category}`}
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-900 text-white px-4 py-2 rounded-lg text-center transition"
          >
            ← Back to Books
          </Link>
        </div>
      </div>
    </div>
  );
}