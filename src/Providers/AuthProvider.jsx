import auth from '@/components/Firebase/firebase.config';
import useAxiosCommon from '@/Hooks/useAxiosCommon';
import axios from 'axios';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';


export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = async () => {
    setLoading(true);
    await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
      withCredentials: true,
    });
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Get token from server
  const getToken = async (email) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt`,
      { email },
      { withCredentials: true }
    );
    return data;
  };

  // const handleSaveUser = async (user) => {
  //   try {
  //     const { uid, email, displayName, photoURL, role } = user;
  //     console.log("Saving user:", { uid, email, displayName, photoURL, role });
  //     await axiosCommon.post(`/save-user`, {
  //       uid,
  //       email,
  //       displayName,
  //       photoURL,
  //       role,
  //     });
  //   } catch (err) {
  //     console.error("Error saving user:", err);
  //   }
  // };

 const saveUser = async (currentUser) => {
   const { email, uid, displayName, photoURL } = currentUser;


   const displayNameValue = displayName || "User"; 
   const photoURLValue = photoURL || "";

   const userData = {
     email,
     uid,
     displayName: displayNameValue,
     photoURL: photoURLValue,
     role: "guest",
     status: "Verified",
   };

   try {
     const { data } = await axios.put(
       `${import.meta.env.VITE_API_URL}/user`,
       userData
     );
     return data;
   } catch (error) {
     console.error("Error saving user:", error);
     toast.error("Error saving user. Please try again later.");
     return null;
   }
 };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
      if (currentUser) {
        await getToken(currentUser?.email)
        await saveUser(currentUser)
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;