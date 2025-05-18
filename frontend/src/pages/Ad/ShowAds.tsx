import { useEffect, useState } from "react";
import NavigationBar from "../../components/layout/Navigation/NavigationBar";
import axios from "axios";
import { checkToken } from "../../hooks/api/authHooks";
import NavigationBarNoAuth from "../../components/layout/Navigation/NavigationBarNoAuth";
import Button from "../../components/ui/common/Button/Button";
import { Link } from "react-router-dom";
import SelectWithSearch2 from "../../components/ui/common/Select/SelectWithSearch2";
import InputComponent2 from "../../components/ui/common/Input/InputComponent2";
import { Slider } from "../../components/ui/common/Slider/Slider";
import { Ad } from "../../types/models/adTypes";
import FavoriteButton from "../../components/ui/common/Button/FavoriteButton";

export default function MobileSearchForm() {
    const [isMobile, setIsMobile] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { data, isError } = checkToken();
    const isLoggedIn = !isError;
    const [dataAds, setData] = useState<Ad[]>([]);
    const [filters, setFilters] = useState({
        searchQuery: "",
        pet: "",
        size: "",
        voivodeship: "",
        age: "",
        city: ""
    });

    const updateFilter = (name: string, value: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

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
        setIsLoading(true);
        axios
            .get("http://localhost:3000/ads")
            .then((response) => {
                setData(response.data as []);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    }, []);

    const handleFilters = () => {
       //console.log(filters);
    let query = "http://localhost:3000/ads/filter";
    const queryParams = [];

    if (filters.searchQuery) queryParams.push(`search=${encodeURIComponent(filters.searchQuery)}`);
    if (filters.pet) queryParams.push(`pet=${encodeURIComponent(filters.pet)}`);
    if (filters.size) queryParams.push(`size=${encodeURIComponent(filters.size)}`);
    if (filters.voivodeship) queryParams.push(`voivodeship=${encodeURIComponent(filters.voivodeship)}`);
    if (filters.age) queryParams.push(`age=${encodeURIComponent(filters.age)}`);
    if (filters.city) queryParams.push(`city=${encodeURIComponent(filters.city)}`);

    if (queryParams.length > 0) {
        query += `?${queryParams.join("&")}`;
    }
    console.log(query);
    setIsLoading(true);
    axios.get(query)
        .then((response) => {
            setData(response.data as Ad[]);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching filtered data:", error);
            setIsLoading(false);
        });
    }

    return (
        <div className="w-full flex flex-col min-h-screen bg-gray-50">
            {isError ? <NavigationBarNoAuth /> : <NavigationBar />}

            <div className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
                {/* Tytuł strony */}
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Ogłoszenia</h1>
                    <p className="text-lg text-gray-600">Znajdź swojego idealnego pupila do adopcji</p>
                </div>
                
                {isMobile ? (
                    <div className="relative mb-8">
                        <button
                            className={`flex items-center justify-center w-full py-4 px-5 rounded-lg border ${showSearch ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-200'} shadow-md transition-colors text-lg`}
                            onClick={() => setShowSearch(!showSearch)}
                        >
                            <span className="material-icons mr-2 text-2xl text-gray-700">
                                {!showSearch ? "search" : "close"}
                            </span>
                            <span className="font-medium text-gray-800">
                                {!showSearch ? "Pokaż filtry wyszukiwania" : "Ukryj filtry"}
                            </span>
                        </button>

                        {showSearch && (
                            <div className="w-full flex flex-col mt-4 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                <div className="flex-1 min-w-[180px] mb-4">
                                    <SelectWithSearch2
                                        name="voivodeship"
                                        label="Województwo"
                                        data={["Lubelskie", "Mazowieckie", "Śląskie"]}
                                        onChange={(value) => updateFilter("voivodeship", value)}
                                    />
                                </div>
                                <div className="flex-1 min-w-[180px] mb-4">
                                    <InputComponent2 
                                        type="text" 
                                        label="Miasto" 
                                        name="city" 
                                        placeholder="np. Warszawa"
                                        onChange={(value) => updateFilter("city", value)}
                                    />
                                </div>
                                <div className="flex-1 min-w-[180px] mb-4">
                                    <SelectWithSearch2 
                                        name="pet" 
                                        label="Gatunek" 
                                        data={["dog","cat"]} 
                                        onChange={(value) => updateFilter("pet", value)}
                                    />
                                </div>
                                <div className="flex-1 min-w-[150px] mb-4">
                                    <SelectWithSearch2 
                                        name="size" 
                                        label="Rozmiar" 
                                        data={["small", "medium","big"]} 
                                        onChange={(value) => updateFilter("size", value)}
                                    />
                                </div>
                                <div className="flex-1 min-w-[150px] mb-4">
                                    <SelectWithSearch2 
                                        name="age" 
                                        label="Wiek" 
                                        data={["puppy","adult","senior"]} 
                                        onChange={(value) => updateFilter("age", value)}
                                    />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="flex-grow w-full">
                                        <label htmlFor="search" className="block text-base font-medium text-gray-700 mb-2">
                                            Wyszukaj frazę
                                        </label>
                                        <input
                                            type="search"
                                            name="search"
                                            id="search"
                                            placeholder="Wpisz czego szukasz..."
                                            className="p-4 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base bg-white"
                                            onChange={(e) => updateFilter("searchQuery", e.target.value)}
                                        />
                                    </div>
                                    <div className="w-full mt-2">
                                        <Button 
                                            onClick={handleFilters} 
                                            type="button" 
                                            size="big" 
                                            text="Zastosuj filtry" 
                                            style="primary" 
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full bg-white rounded-lg shadow-md p-8 mb-10 border border-gray-200">
                        {/* Sekcja z filtrami */}
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                            <div>
                                <SelectWithSearch2 
                                    name="voivodeship" 
                                    label="Województwo" 
                                    data={["Lubelskie", "Mazowieckie", "Śląskie"]}
                                    onChange={(value) => updateFilter("voivodeship", value)}
                                />
                            </div>
                            <div>
                                <InputComponent2 
                                    type="text" 
                                    label="Miasto" 
                                    name="city" 
                                    placeholder="np. Warszawa"
                                    onChange={(value) => updateFilter("city", value)}
                                />
                            </div>
                            <div>
                                <SelectWithSearch2 
                                    name="pet" 
                                    label="Gatunek" 
                                    data={["dog","cat"]} 
                                    onChange={(value) => updateFilter("pet", value)}
                                />
                            </div>
                            <div>
                                <SelectWithSearch2 
                                    name="size" 
                                    label="Rozmiar" 
                                    data={["small", "medium","big"]} 
                                    onChange={(value) => updateFilter("size", value)}
                                />
                            </div>
                            <div>
                                <SelectWithSearch2 
                                    name="age" 
                                    label="Wiek" 
                                    data={["puppy","adult","senior"]} 
                                    onChange={(value) => updateFilter("age", value)}
                                />
                            </div>
                        </div>

                        {/* Sekcja wyszukiwania i przycisku */}
                        <div className="flex flex-col md:flex-row items-end gap-4">
                            <div className="flex-grow w-full md:w-auto">
                                <label htmlFor="search" className="block text-base font-medium text-gray-700 mb-2">
                                    Wyszukaj frazę
                                </label>
                                <input
                                    type="search"
                                    name="search"
                                    id="search"
                                    placeholder="Wpisz czego szukasz..."
                                    className="p-4 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base bg-white"
                                    onChange={(e) => updateFilter("searchQuery", e.target.value)}
                                />
                            </div>
                            <div className="flex-shrink-0 w-full md:w-auto mt-2 md:mt-0">
                                <Button 
                                    onClick={handleFilters} 
                                    type="button" 
                                    size="big" 
                                    text="Zastosuj filtry" 
                                    style="primary" 
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Stan ładowania */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-main-color"></div>
                    </div>
                ) : (
                    /* Lista ogłoszeń */
                    <div className="space-y-8">
                        {dataAds.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-lg shadow-md border border-gray-200">
                                <div className="text-gray-400 text-6xl mb-4">
                                    <span className="material-icons text-7xl">search_off</span>
                                </div>
                                <h2 className="text-3xl font-semibold text-gray-700 mb-2">Brak ogłoszeń</h2>
                                <p className="text-xl text-gray-500">Nie znaleziono ogłoszeń spełniających podane kryteria.</p>
                            </div>
                        ) : (
                            dataAds.map((ad, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
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
                                                    <span className="text-base text-white bg-main-color px-3 py-1.5 rounded-full">{ad.pet}</span>
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
                                            </div>
                                            <div className="flex items-center w-full  flex-wrap md:flex-nowrap gap-4 mt-5">
                                               
                                                <Link to={`/ads/${ad._id}`} className="w-full md:w-1/2">
                                                    <Button 
                                                        size="big" 
                                                        style="primary" 
                                                        text="Zobacz więcej" 
                                                    />
                                                </Link>
                                                {isLoggedIn && (
                                                    <div className="w-full md:w-1/2">
                                                        <FavoriteButton adId={ad._id} userId={data?.data as string} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Przycisk dodawania ogłoszenia */}
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
}