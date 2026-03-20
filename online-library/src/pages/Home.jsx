import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import { useSelector } from "react-redux";

export default function Home() {
  const books = useSelector((state) => state.books);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">Welcome to Library</h1>

      <h2 className="mt-4">Categories:</h2>
      <div className="flex gap-4">
        <Link to="/books/Fiction">Fiction</Link>
        <Link to="/books/Non-Fiction">Non-Fiction</Link>
      </div>

      <h2 className="mt-6 text-xl">Popular Books</h2>

      <div className="flex flex-wrap">
        {books.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </div>
  );
}