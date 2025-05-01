import { useParams, Link } from "react-router-dom";
import { useAd } from "../hooks/adHooks";
import { Slider } from "../components/Slider";
import NavigationBar from "../components/NavigationBar";
import NavigationBarNoAuth from "../components/NavigationBarNoAuth";
import { checkToken } from "../hooks/authHooks";
import { useState } from "react";
import Button from "../components/Button";

const SingleAd = () => {
    const {id} = useParams();
    const { data, isLoading, isError } = useAd(id ?? "");
    const { data: authData, isError: authError } = checkToken();
    const [message, setMessage] = useState("");
    const isLoggedIn = !authError;

    if (isLoading) return (
        <div className="w-full h-screen flex flex-col">
            <div>{authError ? <NavigationBarNoAuth /> : <NavigationBar />}</div>
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
    if (isError) return (
        <div className="w-full h-screen flex flex-col">
            <div>{authError ? <NavigationBarNoAuth /> : <NavigationBar />}</div>
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <span className="material-icons text-red-500 text-6xl mb-4">error_outline</span>
                    <p className="text-2xl text-red-500 font-medium">Nie udało się załadować ogłoszenia</p>
                    <p className="text-gray-500 mt-2">Spróbuj ponownie później lub wróć do listy ogłoszeń</p>
                    <Link to="/ads" className="mt-6 inline-block">
                        <Button type="button" style="primary" text="Wróć do ogłoszeń" size="normal" />
                    </Link>
                </div>
            </div>
        </div>
    );

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would implement the logic to send the message
        alert(`Wiadomość wysłana: ${message}`);
        setMessage("");
    };

    // Helper function to translate pet attributes to Polish with proper styling
    const translatePetAttribute = (category: string, value: string | undefined) => {
        if (!value) return "--";
        
        const translations: Record<string, Record<string, string>> = {
            pet: {
                'cat': 'Kot',
                'dog': 'Pies'
            },
            age: {
                'puppy': 'Szczeniak',
                'adult': 'Dorosły',
                'senior': 'Senior'
            },
            size: {
                'small': 'Mały',
                'medium': 'Średni',
                'large': 'Duży'
            }
        };
        
        return translations[category][value] || value;
    };

    return (
        <div className="w-full min-h-screen bg-gray-50">
            {/* Navigation */}
            <div>{authError ? <NavigationBarNoAuth /> : <NavigationBar />}</div>
            
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Back button with subtle hover effect */}
                <button 
                    onClick={() => window.history.back()}
                    className="flex items-center text-gray-600 mb-6 hover:text-main-color transition group"
                >
                    <span className="material-icons mr-2 group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    <span className="font-medium">Powrót do ogłoszeń</span>
                </button>

                {/* Main content with improved spacing and shadows */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left column - Images and main info */}
                    <div className="lg:w-2/3">
                        {/* Title and date with subtle border accent */}
                        <div className="bg-white p-8 rounded-lg shadow-sm mb-8 border-t-4 border-main-color">
                            <h1 className="text-3xl font-bold text-gray-800 mb-3">{data?.title}</h1>
                            <div className="flex items-center justify-between text-sm">
                                <p className="text-gray-500 flex items-center">
                                    <span className="material-icons mr-2 text-gray-400 text-base">calendar_today</span>
                                    {formatDate(data?.createdAt || "")}
                                </p>
                                <p className="text-gray-500 flex items-center">
                                    <span className="material-icons mr-2 text-gray-400 text-base">visibility</span>
                                    {data?.views || 0} wyświetleń
                                </p>
                            </div>
                        </div>

                        {/* Image slider with improved container */}
                        <div className="bg-white p-8 rounded-lg shadow-sm mb-8 flex justify-center items-center">
                            <Slider data={data?.images.map((img) => img.url) || []} />
                        </div>

                        {/* Description with subtle icon */}
                        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
                            <div className="flex items-center mb-5">
                                <span className="material-icons text-main-color mr-3">description</span>
                                <h2 className="text-2xl font-semibold text-gray-800">Opis</h2>
                            </div>
                            <p className="text-gray-700 whitespace-pre-line leading-relaxed pl-2 border-l-2 border-gray-100">{data?.description}</p>
                        </div>

                        {/* Additional notes with styled container */}
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <div className="flex items-center mb-5">
                                <span className="material-icons text-main-color mr-3">sticky_note_2</span>
                                <h2 className="text-2xl font-semibold text-gray-800">Uwagi</h2>
                            </div>
                            <div className="bg-gray-50 border-l-4 border-main-color p-5 rounded-r-md">
                                <p className="text-gray-700 italic leading-relaxed">{data?.note}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right column - Details and contact with sticky positioning */}
                    <div className="lg:w-1/3 lg:self-start lg:sticky lg:top-6">
                        {/* Pet details with icon indicators */}
                        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
                            <div className="flex items-center mb-5">
                                <span className="material-icons text-main-color mr-3">pets</span>
                                <h2 className="text-2xl font-semibold text-gray-800">Szczegóły</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-main-color bg-opacity-10 flex items-center justify-center mr-4">
                                        <span className="material-icons text-main-color">
                                            {data?.pet === 'cat' ? 'emoji_nature' : 'pets'}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Gatunek</p>
                                        <p className="font-medium text-gray-900">{translatePetAttribute('pet', data?.pet)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-main-color bg-opacity-10 flex items-center justify-center mr-4">
                                        <span className="material-icons text-main-color">cake</span>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Wiek</p>
                                        <p className="font-medium text-gray-900">{translatePetAttribute('age', data?.age)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-main-color bg-opacity-10 flex items-center justify-center mr-4">
                                        <span className="material-icons text-main-color">straighten</span>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Rozmiar</p>
                                        <p className="font-medium text-gray-900">{translatePetAttribute('size', data?.size)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Location with map-style design */}
                        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
                            <div className="flex items-center mb-5">
                                <span className="material-icons text-main-color mr-3">place</span>
                                <h2 className="text-2xl font-semibold text-gray-800">Lokalizacja</h2>
                            </div>
                            <div className="bg-gray-50 p-5 rounded-md border border-gray-100 flex items-start">
                                <span className="material-icons text-main-color text-3xl mr-4">location_on</span>
                                <div>
                                    <p className="font-medium text-lg text-gray-900">{data?.city}</p>
                                    <p className="text-gray-500">{data?.voivodeship}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact form with improved styling */}
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <div className="flex items-center mb-5">
                                <span className="material-icons text-main-color mr-3">contact_phone</span>
                                <h2 className="text-2xl font-semibold text-gray-800">Kontakt</h2>
                            </div>
                            
                            {isLoggedIn ? (
                                /* Show phone number if logged in - with nice phone badge */
                                <div className="flex items-center mb-6 bg-green-50 p-3 rounded-md">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                        <span className="material-icons text-green-600">phone</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Numer telefonu</p>
                                        <p className="font-medium text-gray-900">{data?.number}</p>
                                    </div>
                                </div>
                            ) : (
                                /* Show login prompt if not logged in - with improved styling */
                                <div className="bg-gray-50 p-6 rounded-md border border-gray-200 mb-6">
                                    <div className="flex items-center mb-3">
                                        <span className="material-icons text-main-color mr-3">lock</span>
                                        <p className="font-medium">Informacje ukryte</p>
                                    </div>
                                    <p className="text-gray-700 mb-4">Zaloguj się, aby zobaczyć numer telefonu właściciela ogłoszenia.</p>
                                    <Link to="/login" className="w-full block">
                                        <Button 
                                            type="button" 
                                            style="primary" 
                                            text="Zaloguj się" 
                                            size="normal"
                                        />
                                    </Link>
                                </div>
                            )}

                            <div className="pt-6 border-t border-gray-100">
                                {isLoggedIn ? (
                                    /* Show message form if logged in - with improved styling */
                                    <>
                                        <div className="flex items-center mb-4">
                                            <span className="material-icons text-main-color mr-3">message</span>
                                            <h3 className="font-medium text-lg text-gray-800">Wyślij wiadomość</h3>
                                        </div>
                                        <form onSubmit={handleContactSubmit} className="space-y-4">
                                            <textarea
                                                className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-main-color focus:border-main-color bg-gray-50"
                                                rows={5}
                                                placeholder="Napisz wiadomość do właściciela ogłoszenia..."
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                required
                                            ></textarea>
                                            <Button
                                                type="submit"
                                                style="primary"
                                                text="Wyślij wiadomość"
                                                size="normal"
                                            />
                                        </form>
                                    </>
                                ) : (
                                    /* Show login prompt for messaging if not logged in - with improved styling */
                                    <div>
                                        <div className="flex items-center mb-4">
                                            <span className="material-icons text-main-color mr-3">message</span>
                                            <h3 className="font-medium text-lg text-gray-800">Wyślij wiadomość</h3>
                                        </div>
                                        <p className="text-gray-700 mb-4">Zaloguj się, aby wysłać wiadomość do właściciela ogłoszenia.</p>
                                        <Link to="/login">
                                            <Button 
                                                type="button" 
                                                style="secondary" 
                                                text="Zaloguj się aby wysłać wiadomość" 
                                                size="normal"
                                            />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Adoption tip banner */}
            <div className="bg-main-color bg-opacity-10 py-6 mt-10">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center">
                            <span className="material-icons text-main-color text-3xl mr-4">lightbulb</span>
                            <p className="text-gray-800 font-medium">
                                Adopcja to poważna decyzja. Upewnij się, że jesteś gotowy na nowego członka rodziny.
                            </p>
                        </div>
                        <Link to="#" className="text-main-color font-medium hover:underline flex items-center">
                            Dowiedz się więcej
                            <span className="material-icons ml-1">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleAd;