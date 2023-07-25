import { createContext, useEffect, useState } from "react";
import { firebaseAuth } from "../services/firebase";

export const AuthContext = createContext();

function ContextAuth({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setFirebaseUser(user);
      setIsUserLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ firebaseUser, setFirebaseUser, isUserLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default ContextAuth;
