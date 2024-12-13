import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const firebaseConfig = {}; // Add Your Config File Here

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

const FirebaseContext = createContext(null);

const googleProvider = new GoogleAuthProvider(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export function FirebaseProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unSubscribe(); // Cleanup subscription
  });

  async function CreateAccountWithEmailAndPassword(email, password, userName) {
    return await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: userName,
        });
      })
      .then((value) => {
        console.log(
          "Account created and displayName updated successfully.",
          value
        );
      })
      .catch((error) => {
        console.error("Error occurred while creating account:", error);
      });
  }

  async function LoginWithEmailAndPassword(email, password) {
    return await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((value) => console.log("Logged in Successfully", value))
      .catch((error) => console.error("Error While Loggin", error));
  }

  function Logout() {
    signOut(firebaseAuth)
      .then(console.log("logged out Successfully"))
      .catch((e) => console.log("error logging out", e));
  }

  return (
    <FirebaseContext.Provider
      value={{
        CreateAccountWithEmailAndPassword,
        LoginWithEmailAndPassword,
        user,
        Logout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}
