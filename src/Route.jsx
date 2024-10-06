import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./Pages/About";
import ContactUs from "./Pages/Contact";
import Header from "./Components/Header";
import End from "./Components/End";
import Products from "./Products";
import SignUp from "./Pages/Signin";
import Login from "./Pages/Login";
import Search from "./Pages/Search";
import Cart from "./Pages/Cart"; 
import ProductDetails from "./Pages/Details";
import Details from "./Pages/Details";
import ThemeContextProvider from "./context/ThemeContext"; 
function AppRouter(){
    return (
    <>
    <ThemeContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Products />} /> 
          <Route path="/About" element={<AboutUs />} />
          <Route path="/Contact" element={<ContactUs />} />
          <Route path="/Signin" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Product/:id" element={<Details />} />
          <Route path="/Search/:title/id/:id" element={< ProductDetails/>} />

        </Routes>
        <End/>
      </BrowserRouter>
      </ThemeContextProvider>

    

    </>
    );
}

export default AppRouter;
