import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"; // Import ThemeContext

const ProductCard = ({ info }) => {
  const { theme } = useContext(ThemeContext); // Get the current theme

  return (
    <Link
      className="lg:w-1/4 md:w-1/2 w-full p-4"
      to={`/product/${info.id}`}
    >
      <div className={`shadow-lg rounded-lg overflow-hidden border-2 ${theme === 'light' ? 'bg-white border-gray-950' : 'bg-black border-white'}`}>
        <a className="block relative h-40 sm:h-48 rounded overflow-hidden ">
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full"
            src={info.thumbnail}
          />
        </a>
        <div className="p-4">
          <h3 className={`text-xs tracking-widest uppercase mb-1 ${theme === 'light' ? 'text-gray-800' : 'text-gray-400'}`}>
            {info.category}
          </h3>
          <h2 className={`text-lg font-medium truncate ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            {info.title}
          </h2>
          <p className={`mt-1 ${theme === 'light' ? 'text-gray-800' : 'text-gray-300'}`}>
            ${info.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
