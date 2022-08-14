import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults);
  useEffect(() => {
    if (search.length >= 2) {
      const fetchSearch = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify({ search: search }),
        });
        const content = await response.json();
        setSearchResults(content);
      };
      fetchSearch();
    }
  }, [search]);
  return (
    <div className="relative w-64">
      <input
        type="text"
        defaultValue={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-xl py-2 px-4 border w-full"
        placeholder="Search for books..."
      />
      {search.length >= 2 && (
        <div className="absolute search-results flex flex-col bg-gray-100 border space-y-4 rounded-lg w-full py-2 px-3 mt-1 transition ease-in duration-500">
          {searchResults.map((result) => {
            return (
              <Link
                to={result.title}
                onClick={() => setSearch('')}
                key={result.id}
                className="flex border-b pb-2"
              >
                <div className="img">
                  <img src={result.img} alt="img cover" className="w-10 h-16" />
                </div>
                <div className="book-description flex flex-col">
                  <div className="book-title ml-4 text-gray-700 font-medium text-md">
                    {result.title}
                  </div>
                  <p className="text-gray-500 text-sm ml-4">
                    by{' '}
                    <span className="text-gray-700 font-medium">
                      {result.author.name}
                    </span>
                  </p>
                </div>
              </Link>
            );
          })}
          {searchResults.length === 0 && (
            <div className="text-sm font-medium">
              No results where found for "{search}"
            </div>
          )}
        </div>
      )}
      <div className="absolute top-0 right-0 mt-3 mr-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Search;
