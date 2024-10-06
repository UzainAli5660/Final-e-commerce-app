import React from "react"; // Add this line
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./Route";
import { AuthContextProvider } from "./context/AuthContext";
import CartContextProvider from "./context/CartContext";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
        <CartContextProvider>
      <AppRouter />
    </CartContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
