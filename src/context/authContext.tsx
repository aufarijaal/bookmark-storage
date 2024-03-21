import { createContext, useContext, useEffect, useState } from 'react'
import { auth, googleProvider } from '@/firebase/init'
import { User, UserCredential, signInWithRedirect } from 'firebase/auth'

interface ContextProps {
  googleSignInWithRedirect: () => Promise<UserCredential>
  signOut: () => Promise<void>
  getUser: () => User | null
  currentUser: User | null
}

const AuthContext = createContext({} as ContextProps)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  function googleSignInWithRedirect() {
    return signInWithRedirect(auth, googleProvider)
  }

  function signOut() {
    return auth.signOut()
  }

  function getUser() {
    return auth.currentUser
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    googleSignInWithRedirect,
    getUser,
    signOut,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
