import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import BookCard from '../components/BookCard';

export default function BrowseBooks() {

  const {category} = useParams();
  const books = useSelector((state) => state.books);
  const [search, setSearch] = useState("");

  const filtered = books.filter((b) => b.category === category &&
  (b.title.toLowerCase(). includes(search.toLowerCase()) || (
     b.author.toLowerCase().includes(search.toLowerCase())
  ))
);
  return (
    <div className="p-5">
      <h2>{category} Books</h2>

      <input
        type="text"
        placeholder="Search..."
        className="border p-2 my-3"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex flex-wrap">
        {filtered.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </div>
  )
}
