import auth from '@/components/Firebase/firebase.config';
import useAxiosCommon from '@/Hooks/useAxiosCommon';
import axios from 'axios';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';


export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider()
const axiosCommon = useAxiosCommon()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  }

  const resetPassword = email => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }

  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

  const handleSaveUser = async (user) => {
    try {
      const { uid, email, displayName, photoURL } = user;
      console.log("Saving user:", { uid, email, displayName, photoURL });
      await axiosCommon.post(`/save-user`, {
        uid,
        email,
        displayName,
        photoURL,
      });
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log(currentUser)
      setUser(currentUser)
      if (currentUser) {
        await handleSaveUser(currentUser)
      }
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])

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
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;