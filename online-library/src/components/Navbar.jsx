import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-900 p-4 text-white text-lg flex gap-6">
      <Link to="/">Home</Link>
      <Link to="/books/Fiction">Browse Books</Link>
      <Link to="/add">Add Book</Link>
    </nav>
  );
}