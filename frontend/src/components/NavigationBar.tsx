import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
const NavigationBar = () => {
  const [userName, setUserName] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
              setUserName(data.name.split("@")[0]);
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
  
  
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth <= 600) {
        //setIsUserMenuOpen(false);
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };
  return (
    <nav className="w-full bg-gray-100 h-15 border-b-2 flex items-center justify-between p-4 top-0 z-50 sticky border-b-main-button-background shadow-md rounded-sm">
      <Link className="w-1/10" to="/">
        <img className="h-10" src={logo} alt="Logo" />
      </Link>
      {isMobile ? (
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="material-icons"
          >
            {isMenuOpen ? "close" : "menu"}
          </button>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={menuVariants}
                className=" absolute flex flex-col space-y-2 top-12 right-0 bg-gray-200 border border-main-button-background w-52 p-4 text-center rounded-lg shadow-lg"
              >
                <Link
                  className="text-2xl  hover:text-main-button-background transition"
                  to="/offers"
                >
                  Oferty
                </Link>
                <Link
                  className="text-2xl hover:text-main-button-background transition"
                  to="/favorites"
                >
                  {" "}
                  Ulubione
                </Link>
                <Link
                  className="text-2xl hover:text-main-button-background transition"
                  to="/messages"
                >
                  Wiadomosci
                </Link>
                <Link
                  className="text-2xl hover:text-main-button-background transition"
                  to="/comments"
                >
                  Komentarze
                </Link>
                {isLoggedIn ? (
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className=" flex justify-evenly items-center text-2xl hover:text-main-button-background transistion "
                  >
                    {userName || "User"}{" "}
                    <i className="material-icons">
                      {isUserMenuOpen ? "arrow_upward" : "arrow_downward"}
                    </i>{" "}
                  </button>
                ) : (
                  <Link
                    className="text-2xl hover:text-main-button-background transition"
                    to="/login"
                  >
                    Zaloguj sie
                  </Link>
                )}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={menuVariants}
                      className="mt-2 bg-gray-100 border flex flex-col space-y-2 border-main-button-background p-2 rounded-lg shadow"
                    >
                      <Link
                        to="/profile"
                        className="text-2xl hover:text-main-button-background transition"
                      >
                        Profil
                      </Link>
                      <button
                        className="text-2xl text-red-600 hover:brightness-25 cursor-pointer"
                        onClick={() => {
                          axios.get("/user/logout", { withCredentials: true });
                        }}
                      >
                        Wyloguj
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="w-full bg-gray-100 h-15 border-b-2 flex items-center justify-between p-3 top-0.5 sticky border-b-main-button-background">
          <Link
            className="relative text-2xl px-4 py-2 transition-all duration-300 hover:shadow-lg hover:rounded-lg hover:bg-main-button-background group"
            to="/offers"
          >
            Oferty
          </Link>
          <Link
            className="relative text-2xl px-4 py-2 transition-all duration-300 hover:shadow-lg hover:rounded-lg hover:bg-main-button-background group"
            to="/favorites"
          >
            {" "}
            Ulubione
          </Link>
          <Link
            className="relative text-2xl px-4 py-2 transition-all duration-300 hover:shadow-lg hover:rounded-lg hover:bg-main-button-background group"
            to="/messages"
          >
            Wiadomosci
          </Link>
          <Link
            className="relative text-2xl px-4 py-2 transition-all duration-300 hover:shadow-lg hover:rounded-lg hover:bg-main-button-background group "
            to="/comments"
          >
            Komentarze
          </Link>
          <div className="flex flex-col justify-center items-center hover:text-main-button-background transition">
            {isLoggedIn ? (
              <>
                <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                  <span className="material-icons !text-4xl mr-3 ">person</span>
                  <p>{userName}</p>
                </button>
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={menuVariants}
                      className=" absolute flex flex-col space-y-2 top-15 right-0 bg-gray-200 border border-main-button-background w-52 p-4 text-center rounded-lg shadow-lg"
                    >
                      <Link
                        to="/profile"
                        className="text-2xl hover:text-secondary-button-text hover:rounded-lg hover:shadow hover:bg-main-button-background transition"
                      >
                        Profil
                      </Link>
                      <button
                        className="text-2xl  text-red-600 hover:brightness-25 cursor-pointer"
                        onClick={async () => {
                        await axios
                          .get("http://localhost:3000/user/logout", { withCredentials: true })
                          .then(() => {
                            //console.log("Wyloguj");
                            setIsLoggedIn(false);
                            console.clear();
                          })
                          .catch((error) => {
                            console.log("Logout error:", error);
                          });
                        } }
                      >
                        Wyloguj
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link to="/login">Zaloguj sie</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default NavigationBar;
