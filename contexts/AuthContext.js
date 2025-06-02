import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext({
  userId: undefined,
  setUserId: undefined,
})

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null)

  return (
    <AuthContext.Provider
      value={{
        userId,
        setUserId
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}