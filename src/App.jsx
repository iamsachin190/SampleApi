import React, { useState, useEffect } from "react";
import beerData from "./api/SampleApi";
import BeerCard from "./components/BeerCard";

function App() {
  const [beers, setBeers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBeers, setFilteredBeers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 6; 

  useEffect(() => {
    const loadBeers = async () => {
      setLoading(true);
      const data = await beerData();
      setBeers(data);
      setFilteredBeers(data);
      setLoading(false);
    };
    loadBeers();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    const filtered = beers.filter((beer) =>
      beer.name.toLowerCase().includes(query)
    );
    setFilteredBeers(filtered);
    setCurrentPage(1); 
  };

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBeers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredBeers.length / itemsPerPage);

 
  const maxPageButtons = 5; 
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {loading ? (
        <div className="text-center text-blue-500 text-xl">Loading...</div>
      ) : (
        <div className="min-h-screen bg-gray-100 p-6">
          <h1 className="text-3xl font-bold text-center mb-6">Beer Cards</h1>
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search for a beer..."
              value={search}
              onChange={handleSearch}
              className="border rounded-md px-4 py-2 w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((beer) => (
              <BeerCard key={beer.id} beer={beer} />
            ))}
          </div>
          <div className="flex justify-center mt-6 space-x-2">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 border rounded bg-white text-blue-500"
              >
                Prev
              </button>
            )}
            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 border rounded ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500"
                }`}
              >
                {page}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 border rounded bg-white text-blue-500"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
