import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
const NavigationBar = () => {
    const [userName, setUserName] = useState("")
    const [isMobile, setIsMobile] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        if (!isLoggedIn) {
            try {
                axios.get("http://localhost:3000/user/check", { withCredentials: true }).then(response => {
                    const data = response.data as string;
                    console.log(data);
                    if (data === "True") {
                        setIsLoggedIn(true);
                        console.log(data)
                        return;
                    }
                    setIsLoggedIn(false);
                })
            } catch (error) {
                console.log(error);
                setIsLoggedIn(false);
            }
        }
        axios.get('http://localhost:3000/user/name', { withCredentials: true })
            .then(response => {
                const data = response.data as { name: string };
                setUserName(data.name.split("@")[0]);

            })
            .catch(error => {
                console.log(error);
            });
    }, [isLoggedIn]);
    useEffect(() => {
        const resize = (() => {
            if (window.innerWidth <= 600) {
                setIsUserMenuOpen(false);
               
            } else {
                setIsMobile(false);
                
            }
        });
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);

    }, [])
    const menuVariants = {
        hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
    };
    return <nav className="w-full bg-gray-100 h-15 border-b-2 flex items-center justify-between p-4 top-0 z-50 sticky border-b-main-button-background shadow-md rounded-sm">
        <Link className="w-1/10" to="/"><img className="h-10" src={logo} alt="Logo" /></Link>
        {isMobile ? (

            <div className="relative">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="material-icons">{isMenuOpen ? "close" : "menu"}</button>
                <AnimatePresence>x
                    {isMenuOpen &&
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={menuVariants}
                            className=" absolute flex flex-col space-y-2 top-12 right-0 bg-gray-200 border border-main-button-background w-52 p-4 text-center rounded-lg shadow-lg">
                            <Link className="text-2xl  hover:text-main-button-background transition" to="/offers">Oferty</Link>
                            <Link className="text-2xl hover:text-main-button-background transition" to="/favorites"> Ulubione</Link>
                            <Link className="text-2xl hover:text-main-button-background transition" to="/messages">Wiadomosci</Link>
                            <Link className="text-2xl hover:text-main-button-background transition" to="/comments">Komentarze</Link>
                            {isLoggedIn ? (
                                <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className=" flex justify-evenly items-center text-2xl hover:text-main-button-background transistion ">{userName || "User"} <i className="material-icons">{isUserMenuOpen ? "arrow_upward" : "arrow_downward"}</i> </button>)
                                : (<Link className="text-2xl hover:text-main-button-background transition" to="/login">Zaloguj sie</Link>)}
                            <AnimatePresence>
                                {isUserMenuOpen &&
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        variants={menuVariants}
                                        className="mt-2 bg-gray-100 border flex flex-col space-y-2 border-main-button-background p-2 rounded-lg shadow">
                                        <Link to='/profile' className="text-2xl hover:text-main-button-background transition">Profil</Link>
                                        <button className="text-2xl text-red-600 hover:brightness-25 cursor-pointer" onClick={() => {axios.get("/user/logout",{withCredentials:true})}}>Wyloguj</button>
                                    </motion.div>
                                }
                            </AnimatePresence>

                        </motion.div>

                    }
                </AnimatePresence>
            </div>

        ) : (
            <div className="w-full bg-gray-100 h-15 border-b-2 flex items-center justify-between p-3 top-0.5 sticky border-b-main-button-background">

                <Link className="hover:text-main-button-background transition" to="/offers">Oferty</Link>
                <Link className="hover:text-main-button-background transition" to="/favorites"> Ulubione</Link>
                <Link className="hover:text-main-button-background transition" to="/messages">Wiadomosci</Link>
                <Link className="hover:text-main-button-background transition" to="/comments">Komentarze</Link>
                <div className="flex flex-col justify-center items-center hover:text-main-button-background transition">
                    <span className="material-icons !text-4xl mr-3 ">person</span>
                    <p>{userName}</p>

                </div>
            </div>
        )}

    </nav>


}
export default NavigationBar;