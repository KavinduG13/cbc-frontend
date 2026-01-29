import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProductCard from './components/productCard'
import AdminPage from './pages/adminPage'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import { Toaster } from 'react-hot-toast'
import TestPage from './pages/test'
import RegisterPage from './pages/registerPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgotPassword from './pages/forgot-password'
import UserSettings from './pages/userSettings'


function App() {

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div className="w-full h-[100vh]">
          <Toaster position="top-right" />
          <Routes path="/">
            <Route path="/*" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/settings" element={<UserSettings />} />
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App
