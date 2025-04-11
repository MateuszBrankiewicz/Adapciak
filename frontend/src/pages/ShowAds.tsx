import { use, useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import axios from "axios";

export default function MobileSearchForm() {
    const [isMobile, setIsMobile] = useState(true); // Zmień zgodnie z własną logiką
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("");
    const [size, setSize] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    interface Ad {
        title: string;
        description: string;
        images: {
            url: string;
        }[];
        district: string;
        city: string;
        voivodeship: string;
    }

    const [data, setData] = useState<Ad[]>([]);
    // const [errors, setErrors] = useState({});
    const [voivodeship, setVoivodeship] = useState("");
    useEffect(() => {
        const resize = () => {
            if (window.innerWidth <= 760) {
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
    useEffect(() => {
        axios
            .get("http://localhost:3000/ads")
            .then((response) => {
                setData(response.data as []);
                console.log(response.data);
            }
            )
            .catch((error) => {
                console.error("Error fetching data:", error);
            }
            );
    }, []);

    const handleFilters = () => {
        console.log(searchQuery);
        console.log(category);
        console.log(voivodeship);
        console.log(district);
        console.log(city);

    }

    return (
        <>
            <div className={"w-full h-full"}>
                <NavigationBar />
                {isMobile ? (
                    <div className="container flex flex-col items-center relative">
                        <button
                            className="material-icons absolute right-4 top-0 "
                            onClick={() => setShowSearch(!showSearch)}
                        >
                            {!showSearch ? "search" : "close"}
                        </button>

                        {showSearch && (

                            <div className="bg-gray-50 w-full p-4 rounded shadow">
                                <div className="flex flex-col gap-4 mt-10">
                                    <input
                                        type="text"
                                        placeholder="Szukaj..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="border p-2 rounded"
                                    />
                                    {/*{errors.searchQuery != "" && (*/}
                                    {/*    <span className="text-red-500 text-sm">{errors.searchQuery}</span>*/}
                                    {/*)}*/}

                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="border p-2 rounded"
                                    >
                                        <option value="">Wybierz gatunek</option>
                                        <option value="psy">Psy</option>
                                        <option value="koty">Koty</option>
                                        <option value="inne">Inne</option>
                                    </select>

                                    <select className="border p-2 rounded"
                                        value={size}
                                        onChange={(e) => setSize(e.target.value)}
                                    >
                                        <option value="">Wybierz rozmiar </option>
                                        <option>Małe</option>
                                        <option>Średni</option>
                                        <option>Duży</option>
                                    </select>
                                    <select value={voivodeship} onChange={(e) => setVoivodeship(e.target.value)} className="border p-2 rounded">
                                        <option value="">Wojewodztwo</option>
                                        <option value="Lublin">Lubelskie</option>
                                    </select>

                                    <select value={district} onChange={(e) => setDistrict(e.target.value)} className="border p-2 rounded">
                                        <option value="">Wybierz powiat</option>

                                    </select>
                                    <select name="city" id="city" value={city} className="border p-2 rounded">
                                        <option value="">Wybierz miasto</option>
                                    </select>
                                    <button
                                        onClick={() => { handleFilters(); setShowSearch(false); }}
                                        className="bg-secondary-button-background text-secondary-button-text px-4 py-2 rounded hover:brightness-75"
                                    >
                                        Szukaj
                                    </button>
                                </div>
                            </div>

                        )}
                    </div>
                ) : (
                    <div className=" flex justify-centers p-4 w-full h-full">
                        <div className="sm:w-full max-w-sm w-2/5 border right-0.5 border-main-button-background rounded-2xl p-6 bg-gray-50 shadow-xl space-y-4 self-center justify-self-center m-4 ">
                            <h4 className="text-2xl text-center font-bold text-gray-700">Filtry</h4>

                            {/* Szukaj */}
                            <input
                                type="text"
                                placeholder="Szukaj..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border p-2 rounded w-full border-main-button-background"
                            />

                            {/* Sortowanie */}
                            <div>
                                <label className="text-lg font-semibold block mb-1 text-gray-700">Sortuj po:</label>
                                <div className="flex flex-col gap-1 text-gray-600">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="sort" id="recentAsc" /> Ostatnio dodane
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="sort" id="recentDesc" /> Najpóźniej dodane
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="sort" id="viewsAsc" /> Wyświetlenia rosnąco
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="sort" id="viewsDesc" /> Wyświetlenia malejąco
                                    </label>
                                </div>
                            </div>

                            {/* Selecty */}
                            <div className="space-y-3">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="border p-2 rounded w-full"
                                >
                                    <option value="">Wybierz gatunek</option>
                                    <option value="psy">Psy</option>
                                    <option value="koty">Koty</option>
                                    <option value="inne">Inne</option>
                                </select>

                                <select
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="border p-2 rounded w-full"
                                >
                                    <option value="">Wybierz rozmiar</option>
                                    <option>Małe</option>
                                    <option>Średni</option>
                                    <option>Duży</option>
                                </select>

                                <select
                                    value={voivodeship}
                                    onChange={(e) => setVoivodeship(e.target.value)}
                                    className="border p-2 rounded w-full"
                                >
                                    <option value="">Województwo</option>
                                    <option value="Lublin">Lubelskie</option>
                                </select>

                                <select
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                    className="border p-2 rounded w-full"
                                >
                                    <option value="">Wybierz powiat</option>
                                </select>

                                <select
                                    name="city"
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="border p-2 rounded w-full"
                                >
                                    <option value="">Wybierz miasto</option>
                                </select>
                            </div>

                            {/* Przycisk */}
                            <button
                                onClick={() => {
                                    handleFilters();
                                    setShowSearch(false);
                                }}
                                className="w-full bg-secondary-button-background text-secondary-button-text px-4 py-2 rounded hover:brightness-75 transition"
                            >
                                Szukaj
                            </button>
                        </div>


                        <div className="grid grid-cols-3 grid-rows-2 gap-4">
                            {data.map((ad, index) => (
                                <>                                      
                                <div key={index} className="bg-white w-full rounded-lg shadow-md p-4">
                                    <h2 className="text-xl font-bold">{ad.title}</h2>
                                    <p className="text-gray-700">{ad.description}</p>
                                    <img src={ad.images[0].url} className="w-full h-48 object-cover rounded mt-2" />
                                    <button className="bg-secondary-button-background text-secondary-button-text px-4 py-2 rounded mt-4">Zobacz więcej</button>
                                </div>
                                    <div key={index} className="bg-white w-full rounded-lg shadow-md p-4">
                                        <h2 className="text-xl font-bold">{ad.title}</h2>
                                        <p className="text-gray-700">{ad.description}</p>
                                        <img src={ad.images[0].url} className="w-full h-48 object-cover rounded mt-2" />
                                        <button className="bg-secondary-button-background text-secondary-button-text px-4 py-2 rounded mt-4">Zobacz więcej</button>
                                    </div>
                                    <div key={index} className="bg-white w-full rounded-lg shadow-md p-4">
                                        <h2 className="text-xl font-bold">{ad.title}</h2>
                                        <p className="text-gray-700">{ad.description}</p>
                                        <img src={ad.images[0].url} className="w-full h-48 object-cover rounded mt-2" />
                                        <button className="bg-secondary-button-background text-secondary-button-text px-4 py-2 rounded mt-4">Zobacz więcej</button>
                                    </div>
                                    <div key={index} className="bg-white w-full rounded-lg shadow-md p-4">
                                    <h2 className="text-xl font-bold">{ad.title}</h2>
                                    <p className="text-gray-700">{ad.description}</p>
                                    <img src={ad.images[0].url} className="w-full h-48 object-cover rounded mt-2" />
                                    <button className="bg-secondary-button-background text-secondary-button-text px-4 py-2 rounded mt-4">Zobacz więcej</button>
                                </div>
                                    <div key={index} className="bg-white w-full rounded-lg shadow-md p-4">
                                        <h2 className="text-xl font-bold">{ad.title}</h2>
                                        <p className="text-gray-700">{ad.description}</p>
                                        <img src={ad.images[0].url} className="w-full h-48 object-cover rounded mt-2" />
                                        <button className="bg-secondary-button-background text-secondary-button-text px-4 py-2 rounded mt-4">Zobacz więcej</button>
                                    </div>
                                    <div key={index} className="bg-white w-full rounded-lg shadow-md p-4">
                                        <h2 className="text-xl font-bold">{ad.title}</h2>
                                        <p className="text-gray-700">{ad.description}</p>
                                        <img src={ad.images[0].url} className="w-full h-48 object-cover rounded mt-2" />
                                        <button className="bg-secondary-button-background text-secondary-button-text px-4 py-2 rounded mt-4">Zobacz więcej</button>
                                    </div>
                                </>


                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
