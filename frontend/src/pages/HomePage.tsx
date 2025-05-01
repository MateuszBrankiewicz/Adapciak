import NavigationBarNoAuth from "../components/NavigationBarNoAuth";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="w-full flex flex-col min-h-screen">
           <NavigationBarNoAuth />

            <div className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
                <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start lg:justify-between w-full max-w-7xl">
                    <div className="max-w-xl mt-8 lg:mt-0 text-center lg:text-left">
                        <h1 className="text-5xl lg:text-6xl font-extrabold">Adoptuj zwierzątko,</h1>
                        <h2 className="text-4xl lg:text-5xl text-main-color font-extrabold mt-2">Odmień życie</h2>
                        <p className="text-text-gray text-xl lg:text-2xl mt-6">Znajdź swoją bratnią duszę wśród zwierzątek już dziś!</p>
                        <p className="text-text-gray text-xl lg:text-2xl mt-2">Wystarczy, że zaczniesz przeglądać ogłoszenia</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8">
                            <Link to="/ads" className="w-full sm:w-auto">
                                <button className="bg-main-color rounded-md text-white font-bold px-6 py-3 cursor-pointer hover:brightness-90 transition text-xl w-full sm:w-auto flex items-center justify-center">
                                    Przeglądaj ogłoszenia
                                    <span className="material-icons ml-2">arrow_forward</span>
                                </button>
                            </Link>
                            <Link to="/login" className="w-full sm:w-auto">
                                <button className="border-main-color border-2 rounded-md text-main-color font-bold px-6 py-3 cursor-pointer hover:bg-main-color hover:bg-opacity-10 transition text-xl w-full sm:w-auto">
                                    Zaloguj się
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full max-w-md lg:max-w-lg">
                        <img src="/samoyed.png" alt="Pies do adopcji" className="w-full h-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;