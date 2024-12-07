import BlogDetails from './components/BlogDetails';
import Contact from './components/Contact';
import FavoritePage from './components/FavoritePage';
import Footer from './components/Footer';
import Header from './components/Header';
import Landing from './components/landing/landing';
import GuestLayout from './auth_components/GuestLayout';
import Login from './auth_components/Login';
import Signup from './auth_components/Signup';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';

function App() {
  // Determine the current route
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/signup"].includes(location.pathname);

  return (
    <div>
      {/* Conditionally render Header */}
      {!hideHeaderFooter && <Header />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/blogdetails" element={<BlogDetails />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/contact" element={<Contact />} />

       {/* Authentication routes inside GuestLayout */}
       <Route path="/" element={<GuestLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* Redirects */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Conditionally render Footer */}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
