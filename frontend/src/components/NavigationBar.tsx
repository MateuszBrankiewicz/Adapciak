import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const NavigationBar = () => {
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  // Sprawdzanie czy użytkownik jest zalogowany
  useEffect(() => {
    axios
      .get("http://localhost:3000/user/check", { withCredentials: true })
      .then((response) => {
        const data = response.data as string;
        if (data === "True") {
          setIsLoggedIn(true);
          axios
            .get("http://localhost:3000/user/name", { withCredentials: true })
            .then((response) => {
              const data = response.data as { name: string };
              setUserName(data.name);
            })
            .catch((error) => console.log("Error fetching username:", error));
        }
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          console.log("User not logged in.");
        } else {
          console.log("Error checking login:", error);
          console.clear();
        }
        setIsLoggedIn(false);
      });
  }, []);
  
  // Dostosowywanie widoku do szerokości ekranu
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setIsMenuOpen(false);
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  
  // Zamykanie menu po kliknięciu poza nim
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Wylogowywanie użytkownika
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/user/logout", { withCredentials: true });
      setIsLoggedIn(false);
      setIsUserMenuOpen(false);
      window.location.href = "/";
    } catch (error) {
      console.log("Logout error:", error);
    }
  };
  
  // Animacje menu
  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };
  
  // Sprawdzenie czy link jest aktywny
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-extrabold">
                Adapciak<span className="text-main-color">.pl</span>
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex md:items-center md:space-x-6">
              <Link 
                to="/ads" 
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/ads') || isActive('/ads/add')
                    ? 'text-main-color font-semibold'
                    : 'text-gray-700 hover:text-main-color hover:bg-gray-50'
                }`}
              >
                Ogłoszenia
              </Link>
              
              <Link 
                to="/favorites" 
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/favorites')
                    ? 'text-main-color font-semibold'
                    : 'text-gray-700 hover:text-main-color hover:bg-gray-50'
                }`}
              >
                Ulubione
              </Link>
              
              <Link 
                to="/messages" 
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/messages')
                    ? 'text-main-color font-semibold'
                    : 'text-gray-700 hover:text-main-color hover:bg-gray-50'
                }`}
              >
                Wiadomości
              </Link>
              
              <Link 
                to="/comments" 
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/comments')
                    ? 'text-main-color font-semibold'
                    : 'text-gray-700 hover:text-main-color hover:bg-gray-50'
                }`}
              >
                Komentarze
              </Link>
            </div>
          )}
          
          {/* User Section */}
          <div className="flex items-center" ref={userMenuRef}>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-main-color px-3 py-2 rounded-md text-base font-medium transition-colors"
                >
                  <span className="material-icons text-lg">account_circle</span>
                  <span className="hidden md:block">{userName || "Użytkownik"}</span>
                  <span className="material-icons text-sm">
                    {isUserMenuOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                  </span>
                </button>
                
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={menuVariants}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-main-color"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <span className="material-icons text-sm mr-2">person</span>
                          Twój profil
                        </div>
                      </Link>
                      
                      <Link
                        to="/ads/add"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-main-color"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <span className="material-icons text-sm mr-2">add_circle</span>
                          Dodaj ogłoszenie
                        </div>
                      </Link>
                      
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-main-color"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <span className="material-icons text-sm mr-2">settings</span>
                          Ustawienia
                        </div>
                      </Link>
                      
                      <div className="border-t border-gray-100 my-1"></div>
                      
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      >
                        <div className="flex items-center">
                          <span className="material-icons text-sm mr-2">logout</span>
                          Wyloguj się
                        </div>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-base font-medium text-main-color border border-main-color hover:bg-main-color hover:text-white transition-colors"
                >
                  Zaloguj
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-base font-medium text-white bg-main-color hover:bg-opacity-90 transition-colors"
                >
                  Zarejestruj
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          {isMobile && (
            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-main-color hover:bg-gray-50 focus:outline-none"
              >
                <span className="material-icons">{isMenuOpen ? "close" : "menu"}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/ads"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/ads') ? 'text-main-color bg-gray-50' : 'text-gray-700 hover:text-main-color hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Ogłoszenia
              </Link>
              <Link
                to="/favorites"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/favorites') ? 'text-main-color bg-gray-50' : 'text-gray-700 hover:text-main-color hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Ulubione
              </Link>
              <Link
                to="/messages"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/messages') ? 'text-main-color bg-gray-50' : 'text-gray-700 hover:text-main-color hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Wiadomości
              </Link>
              <Link
                to="/comments"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/comments') ? 'text-main-color bg-gray-50' : 'text-gray-700 hover:text-main-color hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Komentarze
              </Link>
              
              {isLoggedIn && (
                <>
                  <div className="border-t border-gray-100 my-2"></div>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-main-color hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Twój profil
                  </Link>
                  <Link
                    to="/ads/add"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-main-color hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dodaj ogłoszenie
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50"
                  >
                    Wyloguj się
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavigationBar;
