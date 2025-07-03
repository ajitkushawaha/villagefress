// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const navigate= useNavigate()
  const [user, setUser] = useState<any>(() => {
    const storedUser = localStorage.getItem('auth_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('auth_user');
  });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();

        const fullUser = { ...firebaseUser, ...userData };

        setUser(fullUser);
        setIsAuthenticated(true);
        localStorage.setItem('auth_user', JSON.stringify(fullUser));
      } else {
        clearAuthState();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('auth_user', JSON.stringify(userData));
  };

  const logout = () => {
    signOut(auth);
    clearAuthState();
    navigate('/auth')
  };

  const clearAuthState = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_user');
  };

  return {
    user,
    isAuthenticated,
    role: user?.role || 'user', // 👈 Expose role for use in routes
    login,
    logout,
    loading,
  };
}
