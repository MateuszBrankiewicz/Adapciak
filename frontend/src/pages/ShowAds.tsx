import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import axios from "axios";
import { checkToken } from "../hooks/authHooks";
import NavigationBarNoAuth from "../components/NavigationBarNoAuth";
import Button from "../components/Button";
import SearchMobile from "../components/SearchMobile";
import { Link } from "react-router-dom";
import SelectWithSearch2 from "../components/SelectWithSearch2";
import InputComponent2 from "../components/InputComponent2";
import { Slider } from "../components/Slider";

export default function MobileSearchForm() {
    const [isMobile, setIsMobile] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("");
    const [size, setSize] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    interface Ad {
        _id: string;
        title: string;
        description: string;
        images: {
            url: string;
        }[];
        district: string;
        city: string;
        voivodeship: string;
    }
    const { data, isLoading, isError } = checkToken();
    const [dataAds, setData] = useState<Ad[]>([]);
    const [voivodeship, setVoivodeship] = useState("");
    const [filters, setFilters] = useState({
        searchQuery: "",
        category: "",
        size: "",
        voivodeship: "",
        district: "",
        city: ""
    });
    
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
    
    useEffect(() => {
        axios
            .get("http://localhost:3000/ads")
            .then((response) => {
                setData(response.data as []);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleFilters = () => {
        // Implementacja filtrowania
    }

    return (
        <div className="w-full flex flex-col min-h-screen">
            {isError ? <NavigationBarNoAuth /> : <NavigationBar />}

            <div className="flex-1 container mx-auto px-4 py-6">
                {isMobile ? (
                    <div className="flex flex-col items-center relative mb-6">
                        <button
                            className="material-icons absolute right-4 top-0 text-2xl"
                            onClick={() => setShowSearch(!showSearch)}
                        >
                            {!showSearch ? "search" : "close"}
                        </button>

                        {showSearch && (
                            <SearchMobile onSearch={handleFilters}
                                onClose={() => setShowSearch(false)} />
                        )}
                    </div>
                ) : (
                    <div className="w-full bg-gray-100 rounded-lg shadow p-6 mb-8">
                        {/* Sekcja z filtrami */}
                        <div className="flex flex-wrap gap-4 mb-6">
                            <div className="flex-1 min-w-[180px]">
                                <SelectWithSearch2 name={"voivodeship"} label={"Województwo"} data={["Lubelskie", "Mazowieckie", "Śląskie"]} />
                            </div>
                            <div className="flex-1 min-w-[180px]">
                                <InputComponent2 type={"text"} label={"Miasto"} name={"city"} placeholder={"np. Warszawa"} />
                            </div>
                            <div className="flex-1 min-w-[180px]">
                                <SelectWithSearch2 name={"pet"} label={"Rasa"} data={["Owczarek", "Labrador", "Mieszaniec"]} />
                            </div>
                            <div className="flex-1 min-w-[150px]">
                                <SelectWithSearch2 name={"size"} label={"Rozmiar"} data={["Mały", "Średni", "Duży"]} />
                            </div>
                            <div className="flex-1 min-w-[150px]">
                                <SelectWithSearch2 name={"age"} label={"Wiek"} data={["Szczenię", "Dorosły", "Senior"]} />
                            </div>
                        </div>
    
                        {/* Sekcja wyszukiwania i przycisku */}
                        <div className="flex flex-wrap sm:flex-nowrap items-end gap-4">
                            <div className="flex-grow w-full sm:w-auto mb-3.5">
                                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                                    Wyszukaj frazę
                                </label>
                                <input
                                    type="search"
                                    name="search"
                                    id="search"
                                    placeholder="Wpisz czego szukasz..."
                                    className="p-3.5 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                                />
                            </div>
                            <div className="flex-shrink-0 w-full sm:w-auto">
                                <Button type="button" size="big" text="Zastosuj filtry" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Lista ogłoszeń */}
                <div className="space-y-6">
                    {dataAds.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-xl text-gray-500">Brak dostępnych ogłoszeń</p>
                        </div>
                    ) : (
                        dataAds.map((ad, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-2/5 p-4">
                                        <Slider data={ad.images.map((img) => img.url)} />
                                    </div>
                                    <Link to={`/ads/${ad._id}`} className="md:w-3/5 p-6 flex flex-col justify-between hover:bg-gray-50">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{ad.title}</h2>
                                            <p className="text-gray-600 mb-4">{ad.description.length > 120 ? 
                                                `${ad.description.substring(0, 120)}...` : ad.description}</p>
                                            <div className="flex items-center text-gray-500 text-sm">
                                                <span className="material-icons text-sm mr-1">location_on</span>
                                                <span>{ad.voivodeship}, {ad.city}</span>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button className="bg-main-color text-white px-4 py-2 rounded hover:brightness-95 transition">
                                                Zobacz więcej
                                            </button>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                
                {/* Przycisk dodawania ogłoszenia */}
                <div className="fixed bottom-6 right-6">
                    <Link to="/ads/add">
                        <button className="bg-main-color text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:brightness-90 transition">
                            <span className="material-icons">add</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
