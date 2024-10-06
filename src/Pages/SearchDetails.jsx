import { useEffect, useState } from "react";
import { useParams } from "react-router";
import End from "../Components/End";

function ProductDetails() {
  const { id } = useParams(); // Extract the id from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setNotFound(false);
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.title) {
          setProduct(data);
          setLoading(false);
        } else {
          setNotFound(true);
          setLoading(false);
        }
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-300 pb-20 border-gray-800">
      <div className="container mx-auto p-6 rounded-lg border  bg-gray-800 max-w-3xl flex-grow">
        <h1 className="text-3xl font-bold mb-4 text-center">
          {product ? product.title : "Loading..."}
        </h1>
        {product ? (
          <div className="flex flex-col md:flex-row items-center bg-gray-700 p-4 rounded-lg border border-gray-800 shadow-md">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 border border-gray-800"
            />
            <div className="md:ml-4">
              <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
              <p className="text-sm mb-3">{product.description}</p>
              <h3 className="text-xl font-medium mb-2">
                Price: <span className="font-normal">${product.price}</span>
              </h3>
              <h3 className="text-xl font-medium">
                Rating: <span className="font-normal">{product.rating}</span>
              </h3>
            </div>
          </div>
        ) : notFound ? (
          <p className="text-lg text-center">Product Not Found</p>
        ) : (
          <p className="text-lg text-center">Loading product details...</p>
        )}
      </div>
      <End />
    </div>
  );
}

export default ProductDetails;
