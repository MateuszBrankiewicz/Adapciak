import { useEffect, useState } from "react";
import NavigationBar from "../../components/layout/Navigation/NavigationBar";
import { checkToken } from "../../hooks/api/authHooks";
import Button from "../../components/ui/common/Button/Button";
import { Link } from "react-router-dom";
import { Slider } from "../../components/ui/common/Slider/Slider";
import { Ad } from "../../types/models/adTypes";
import { useUserAds } from "../../hooks/api/adHooks";

const YourAdds = () => {
    const [isMobile, setIsMobile] = useState(true);
    const { data: authData, isError: authError } = checkToken();
    const isLoggedIn = !authError;
    const { data: userAds = [], isLoading, isError } = useUserAds();

    useEffect(() => {
        const resize = () => {
            if (window.innerWidth <= 760) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

 
    

    return (
        <div className="w-full flex flex-col min-h-screen bg-gray-50">
            <NavigationBar />

            <div className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
                {/* Tytuł strony */}
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Twoje ogłoszenia</h1>
                    <p className="text-lg text-gray-600">Zarządzaj swoimi ogłoszeniami adopcyjnymi</p>
                </div>

                {/* Przycisk dodania nowego ogłoszenia */}
                <div className="mb-8">
                    <Link to="/ads/add">
                        <Button 
                            type="button" 
                            style="primary" 
                            text="Dodaj nowe ogłoszenie" 
                            size="big"
                        />
                    </Link>
                </div>

                {/* Stan ładowania */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-main-color"></div>
                    </div>
                ) : isError ? (
                    <div className="text-center py-16 bg-white rounded-lg shadow-md border border-gray-200">
                        <div className="text-gray-400 text-6xl mb-4">
                            <span className="material-icons text-7xl">error_outline</span>
                        </div>
                        <h2 className="text-3xl font-semibold text-gray-700 mb-2">Błąd ładowania</h2>
                        <p className="text-xl text-gray-500">Nie udało się pobrać Twoich ogłoszeń. Spróbuj ponownie.</p>
                    </div>
                ) : (
                    /* Lista ogłoszeń użytkownika */
                    <div className="space-y-8">
                        {userAds.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-lg shadow-md border border-gray-200">
                                <div className="text-gray-400 text-6xl mb-4">
                                    <span className="material-icons text-7xl">pets</span>
                                </div>
                                <h2 className="text-3xl font-semibold text-gray-700 mb-2">Brak ogłoszeń</h2>
                                <p className="text-xl text-gray-500 mb-6">Nie masz jeszcze żadnych ogłoszeń adopcyjnych.</p>
                                <Link to="/ads/add">
                                    <Button 
                                        type="button" 
                                        style="primary" 
                                        text="Dodaj pierwsze ogłoszenie" 
                                        size="normal"
                                    />
                                </Link>
                            </div>
                        ) : (
                            userAds.map((ad, index) => (
                                <div key={ad._id || index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="md:w-2/5 p-5">
                                            <div className="h-64 md:h-80 overflow-hidden rounded-lg">
                                                <Slider data={ad.images.map((img) => img.url)} />
                                            </div>
                                        </div>
                                        <div className="md:w-3/5 p-7 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <h2 className="text-3xl font-bold text-gray-800">{ad.title}</h2>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-base text-white bg-main-color px-3 py-1.5 rounded-full">{ad.pet}</span>
                                                        <div className="flex items-center text-gray-500 text-sm">
                                                            <span className="material-icons text-base mr-1">visibility</span>
                                                            <span>{ad.views || 0}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-lg text-gray-600 mb-6">
                                                    {ad.description && ad.description.length > 200
                                                        ? `${ad.description.substring(0, 200)}...`
                                                        : ad.description}
                                                </p>
                                                <div className="flex items-center text-gray-500 text-base mb-4">
                                                    <span className="material-icons text-xl mr-2">location_on</span>
                                                    <span className="font-medium">{ad.voivodeship}, {ad.city}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">{ad.age}</span>
                                                    <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">{ad.size}</span>
                                                </div>
                                                <div className="flex items-center text-gray-500 text-sm">
                                                    <span className="material-icons text-base mr-1">schedule</span>
                                                    <span>Dodano: {new Date(ad.createdAt || "").toLocaleDateString('pl-PL')}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center w-full flex-wrap md:flex-nowrap gap-4 mt-5">
                                                
                                                <div className="w-full md:w-1/3">
                                                    <Link to={`/ads/edit/${ad._id}`}>
                                                        <Button 
                                                            size="big" 
                                                            style="primary" 
                                                            text="Edytuj" 
                                                            type="button"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="w-full md:w-1/3">
                                                    <Button 
                                                        size="big" 
                                                        style="secondary" 
                                                        text="Usuń" 
                                                        type="button"
                                                        onClick={() => {
                                                            // TODO: Implementacja usuwania ogłoszenia
                                                            if (confirm("Czy na pewno chcesz usunąć to ogłoszenie?")) {
                                                                console.log("Delete ad:", ad._id);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Przycisk dodawania ogłoszenia (floating) */}
                <div className="fixed bottom-8 right-8 z-10">
                    <Link to="/ads/add">
                        <button className="bg-main-color text-white rounded-full w-20 h-20 flex items-center justify-center shadow-xl hover:brightness-95 transition transform hover:scale-105">
                            <span className="material-icons text-3xl">add</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default YourAdds;