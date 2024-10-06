import { createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase"; 
import { signOut } from "firebase/auth"; 
const AuthContext = createContext();

function AuthContextProvider({ children }) { 
  const [user, setUser] = useState({
    islogin: false,
    userInfo: {},
  });
  const [loading, setLoading] = useState(true);

  function onAuthChanged(user) {
    if (user) {
      console.log(user);

      setUser({ 
        islogin: true,   
        userInfo: {
          name: user?.displayName,
          photoUrl: user?.photoURL,
          email: user?.email,
        }
      });
    } else {
      setUser({ islogin: false, userInfo: {} });
    }
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthChanged);
    return subscriber;
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser({ islogin: false, userInfo: {} });
    }).catch((error) => {
      console.error("Error logging out: ", error);
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogout }}>
      {loading ? (
        <div className="w-full h-96 flex justify-center items-center">
          <h1>...Loading</h1>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
