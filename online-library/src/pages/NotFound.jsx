import { useLocation, Link } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="p-10 text-center">
      <h1>404 - Page Not Found</h1>
      <p>Invalid URL: {location.pathname}</p>

      <Link to="/" className="text-blue-500">Go Home</Link>
    </div>
  );
}