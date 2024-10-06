import { createContext, useState } from "react";

// Create ThemeContext
export const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState('light');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Default export
export default ThemeContextProvider;
