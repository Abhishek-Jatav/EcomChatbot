"use client";
import { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut } from "../../lib/firebase";
import { User } from "firebase/auth"; // Import User type from firebase/auth

export default function LoginButton() {
  const [user, setUser] = useState<User | null>(null); // Explicitly type user as User or null

  useEffect(() => {
    // The onAuthStateChanged callback implicitly types the user argument as firebase.User | null
    const unsub = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsub();
  }, []);

  const handleLogin = () => signInWithPopup(auth, provider);
  const handleLogout = () => signOut(auth);

  return (
    <div className="text-right m-4">
      {user ? (
        <>
          <span className="mr-2 text-black">👤 {user.displayName}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded">
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-3 py-1 rounded">
          Login with Google
        </button>
      )}
    </div>
  );
}
