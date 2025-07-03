import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { signInWithPopup } from 'firebase/auth';
import { auth, db, googleProvider } from '../../firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';

export function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const {login}= useAuth()


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (formData.username === 'admin' && formData.password === 'admin123') {
        localStorage.setItem('admin-token', 'admin-token-123');
        navigate('/admin');
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 1000);
  };

 const handleGoogleLogin = async () => {
  setIsLoading(true);
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;

    // 🔥 Step 1: Check if user exists in Firestore
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userDocRef);

    let userData;

    if (!userSnap.exists()) {
      // 🔥 Step 2: Save new user to Firestore
      userData = {
        name: firebaseUser.displayName || '',
        email: firebaseUser.email || '',
        phone: firebaseUser.phoneNumber || '',
        photo: firebaseUser.photoURL || '',
        admin: false, // default
        createdAt: new Date()
      };
      await setDoc(userDocRef, userData);
    } else {
      userData = userSnap.data();
    }

    // 🔥 Step 3: Merge Firebase auth user with Firestore user
    const fullUser = { ...firebaseUser, ...userData };

    // 🔥 Step 4: Store user in context + localStorage
    login(fullUser);
    localStorage.setItem('userData', JSON.stringify(fullUser));

    // 🔥 Step 5: Navigate based on role
    if (userData?.admin) {
      navigate('/admin');
    } else {
      navigate('/home', { replace: true });
    }

  } catch (error) {
    console.error('Google Sign-In Error:', error);
    alert("Google sign-in failed.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">🌱</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">VillageFresh Admin</h1>
          <p className="text-gray-600">Login in to your admin account</p>
        </div>

        {/* Login Form */}
    
          <button
             onClick={handleGoogleLogin}
                disabled={isLoading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              'Login with Google'
            )}
          </button>
          
       

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            VillageFresh Admin Panel v1.0
          </p>
        </div>
      </div>
    </div>
  );
}