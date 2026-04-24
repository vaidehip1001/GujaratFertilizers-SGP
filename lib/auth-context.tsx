'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type UserRole = 'buyer' | 'admin'

export interface AuthUser {
  name: string
  email: string
  role: UserRole
}

interface AuthContextType {
  user: AuthUser | null
  isLoggedIn: boolean
  isInitialized: boolean
  login: (user: AuthUser, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isInitialized: false,
  login: () => {},
  logout: () => {},
})

const USER_KEY = 'tgf_auth_user'
const TOKEN_KEY = 'tgf_auth_token'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_KEY)
      const token = localStorage.getItem(TOKEN_KEY)
      if (storedUser && token) {
        setUser(JSON.parse(storedUser))
      }
    } catch {
      // ignore
    }
    setIsInitialized(true)
  }, [])

  const login = (u: AuthUser, token: string) => {
    setUser(u)
    localStorage.setItem(USER_KEY, JSON.stringify(u))
    localStorage.setItem(TOKEN_KEY, token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TOKEN_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isInitialized, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
