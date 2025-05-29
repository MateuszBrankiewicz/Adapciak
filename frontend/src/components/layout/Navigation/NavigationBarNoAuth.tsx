import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NavigationBarNoAuth = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
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
    <nav className="top-0 sticky p-2 flex justify-between items-center mx-4 border-b-2 border-main-color z-10 bg-white">
      {/* Logo */}
      <div>
        <Link to="/" className="text-4xl font-bold">
          Adapciak<span className="text-main-color">.pl</span>
        </Link>
      </div>
      
      <div className="text-md lg:text-xl flex space-x-8 items-center">
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link 
            to="/ads" 
            className={`hover:border-b-2 hover:border-main-color hover:transition hover:ease-linear ${
              isActive('/ads') ? 'text-main-color font-semibold' : ''
            }`}
          >
            Znajdź zwierzątko
          </Link>
          
          
        </div>
        
        {/* Search and Login/Register */}
        <div className="flex space-x-4 items-center">
          
          {/* Login/Register buttons */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link
              to="/login"
              className="border-main-color border rounded-md text-main-color font-bold px-5 py-2 cursor-pointer hover:brightness-75"
            >
              Zaloguj
            </Link>
            <Link
              to="/register"
              className="bg-main-color rounded-md text-white font-bold px-5 py-2 cursor-pointer hover:brightness-75"
            >
              Zarejestruj
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="relative md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="material-icons cursor-pointer"
            >
              menu
            </button>
            
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={menuVariants}
                  className="absolute right-0 top-full mt-2 flex flex-col space-y-2 bg-gray-100 border border-main-color w-52 p-4 text-center rounded-lg shadow-lg z-20"
                >
                  <Link
                    to="/ads"
                    className="block px-4 py-2 text-lg hover:bg-gray-200 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Znajdź zwierzątko
                  </Link>
                  <Link
                    to="/how-it-works"
                    className="block px-4 py-2 text-lg hover:bg-gray-200 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Jak to działa?
                  </Link>
                  <Link
                    to="/about"
                    className="block px-4 py-2 text-lg hover:bg-gray-200 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    O nas
                  </Link>
                  
                  <hr className="border-main-color my-2" />
                  
                  <Link
                    to="/login"
                    className="w-full border-main-color border rounded-md text-main-color font-bold px-5 py-2 cursor-pointer hover:brightness-90"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Zaloguj
                  </Link>
                  
                  <Link
                    to="/register"
                    className="w-full bg-main-color rounded-md text-white font-bold px-5 py-2 cursor-pointer hover:brightness-90 mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Zarejestruj
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBarNoAuth;