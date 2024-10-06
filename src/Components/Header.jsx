import { Link, useLocation, useNavigate } from "react-router-dom";
import '../App.css'; // Ensure your CSS is applied properly here
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../utils/firebase"; 
import { signOut } from "firebase/auth";
import { ThemeContext } from "../context/ThemeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartOutlined } from "@ant-design/icons";
import { CartContext } from "../context/CartContext";
import { Badge } from "antd";

function Header() {
  const { cartItems } = useContext(CartContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser({ islogin: false, userInfo: {} });
      navigate('/Login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className={`header-container ${theme === 'light' ? "bg-white text-black" : "bg-black text-gray-400"}`}>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <img width={50} height={40} src="https://cdn.vectorstock.com/i/1000v/92/53/clothing-logo-online-shop-fashion-icon-vector-11979253.jpg" alt="Logo" />
        <span className={`logo-text ml-3 text-xl ${theme === 'light' ? "text-black" : "text-white"}`}>Uzain's APP</span>
        <nav className="md:ml-auto flex flex-wrap items-center gap-5 text-base justify-center">
          {location.pathname !== '/' && (
            <Link to="/" className={`nav-link ${theme === 'light' ? "text-black" : "text-white"}`}>
              Home
            </Link>
          )}
          {user.islogin && (
            <Link to="/Search" className={`nav-link ${theme === 'light' ? "text-black" : "text-white"}`}>
              More Products
            </Link>
          )}
          <Link to="/About" className={`nav-link ${theme === 'light' ? "text-black" : "text-white"}`}>
            About Us
          </Link>
          <Link to="/Contact" className={`nav-link ${theme === 'light' ? "text-black" : "text-white"}`}>
            Contact Us
          </Link>
          
          <Link to="/cart" className="nav-link" >
            <Badge count={cartItems.length}>
               <ShoppingCartOutlined style={{  fontSize: 40 , color: theme === 'light' ? 'black' : 'white' }}  />
            </Badge>
          </Link>

          <button 
          onClick={toggleTheme} 
          className="theme-toggle-btn inline-flex items-center justify-center w-10 h-10 rounded-full mr-5 bg-gray-800 text-white focus:outline-none"
          aria-label="Toggle Theme"
        >        {theme === 'light' ? (
          <FontAwesomeIcon icon={faSun} size="lg" />
        ) : (
          <FontAwesomeIcon icon={faMoon} size="lg" />
        )}
      </button>
    
          </nav>

      
  
        {user.islogin ? (
          <div className="flex items-center">
            {user.userInfo.photoUrl && (
              <img 
                src={user.userInfo.photoUrl} 
                alt={user.userInfo.name || "User Avatar"} 
                className="user-avatar w-10 h-10 rounded-full mr-4"
              />
            )}
            <button 
              onClick={handleLogout} 
              className="logout-btn inline-flex items-center bg-gray-700 border-0 py-1 px-3 focus:outline-none hover:bg-black rounded text-base mt-4 md:mt-0 text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/Login">
            <button className="signin-btn inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
