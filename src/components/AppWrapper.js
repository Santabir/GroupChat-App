import { auth } from "../firebase-config.js";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat }) => {
  const signUserOut = async () => {
    try {
      await signOut(auth);
      // 1. Clear the Auth Token
      cookies.remove("auth-token");
      // 2. Clear the Room Persistence (CRITICAL)
      cookies.remove("room"); 
      
      // 3. Reset State
      setIsAuth(false);
      setIsInChat(false);
    } catch (err) {
      console.error("Error signing out: ", err);
    }
  };

  return (
    <div className="App">
      <div className="app-header">
        <h1> Group Chat App</h1>
      </div>

      <div className="app-container">{children}</div>
      {isAuth && (
        <div className="sign-out">
          <button onClick={signUserOut}> Sign Out</button>
        </div>
      )}
    </div>
  );
};