import { useEffect, useState } from "react";
import Heading from "../Components/Heading";
import { Link } from "react-router-dom";

function Search() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch all products when the component mounts
    fetchAllProducts();
  }, []);

  const fetchAllProducts = () => {
    fetch(`https://dummyjson.com/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products)) // Store all products in state
      .catch((err) => console.log("Error fetching products:", err));
  };

  // Filter the products based on the search input
  const filtered = products.filter((data) =>
    data.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto bg-black text-gray-300 min-h-screen p-4">
      {/* Search Input */}
      <input
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border border-gray-600 rounded w-full mx-auto my-4 bg-gray-800 text-gray-300 placeholder-gray-500"
      />

      {/* Display All Items by Default, Filtered by Search */}
      <div className="space-y-4">
        {filtered.map((data) => (
          <Link
            to={`/product/${data.id}`} // Link to product details by id
            key={data.id}
          >
            <Heading id={data.id} title={data.title} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Search;
