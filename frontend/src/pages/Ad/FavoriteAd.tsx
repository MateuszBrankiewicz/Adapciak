import { Link } from "react-router-dom";
import Button from "../../components/ui/common/Button/Button";
import { Slider } from "../../components/ui/common/Slider/Slider";
import { useDeleteFavorite, useFavorite } from "../../hooks/api/adHooks";
import { checkToken } from "../../hooks/api/authHooks";
import NavigationBar from "../../components/layout/Navigation/NavigationBar";

const FavoriteAd = () => {
    const { data } = checkToken();
    const { mutate: deleteFromFavorites } = useDeleteFavorite();
    
    const deleteFavorites = (id: string) => {
        deleteFromFavorites(id);
    };
    
    const { 
        data: favorites, 
        isError: isFavoritesError,
        isLoading: isFavoritesLoading,
    } = useFavorite(data?.data as string || '');

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

    if (isFavoritesLoading) {
        return (
            <div className="w-full min-h-screen bg-gray-50">
                <NavigationBar />
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-main-color"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (isFavoritesError) {
        return (
            <div className="w-full min-h-screen bg-gray-50">
                <NavigationBar />
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="text-red-500 text-6xl mb-4">
                            <span className="material-icons text-6xl">error_outline</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Wystąpił błąd</h2>
                        <p className="text-gray-600 mb-6">Nie udało się załadować ulubionych ogłoszeń.</p>
                        <Button 
                            size="normal" 
                            style="primary" 
                            text="Spróbuj ponownie" 
                            onClick={() => window.location.reload()}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col">
            <NavigationBar />
            
            <div className="flex-1">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    {/* Header section */}
                    <div className="bg-white p-8 rounded-lg shadow-sm mb-8 border-t-4 border-main-color">
                        <div className="flex items-center mb-3">
                            <span className="material-icons text-main-color mr-3 text-3xl">favorite</span>
                            <h1 className="text-3xl font-bold text-gray-800">Ulubione ogłoszenia</h1>
                        </div>
                        <p className="text-gray-500 flex items-center">
                            <span className="material-icons mr-2 text-gray-400 text-base">bookmark</span>
                            {favorites?.length || 0} zapisanych ogłoszeń
                        </p>
                    </div>

                    {favorites?.length === 0 ? (
                        <div className="bg-white p-16 rounded-lg shadow-sm text-center">
                            <div className="text-gray-400 text-6xl mb-6">
                                <span className="material-icons text-6xl">favorite_border</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Brak ulubionych ogłoszeń</h2>
                            <p className="text-gray-600 mb-6">Nie masz jeszcze żadnych zapisanych ogłoszeń. Przejrzyj dostępne ogłoszenia i dodaj je do ulubionych.</p>
                            <Link to="/ads">
                                <Button 
                                    size="normal" 
                                    style="primary" 
                                    text="Przeglądaj ogłoszenia" 
                                    type="button"
                                />
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {favorites?.map((ad, index) => (
                                <div key={ad._id || index} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col lg:flex-row">
                                        {/* Image section */}
                                        <div className="lg:w-2/5 p-6">
                                            <div className="rounded-lg overflow-hidden">
                                                <Slider data={ad.images.map((img) => img.url)} />
                                            </div>
                                        </div>
                                        
                                        {/* Content section */}
                                        <div className="lg:w-3/5 p-6 flex flex-col justify-between">
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-800 mb-3">{ad.title}</h2>
                                                
                                                <p className="text-gray-600 mb-4 leading-relaxed">
                                                    {ad.description.length > 150 
                                                        ? `${ad.description.substring(0, 150)}...` 
                                                        : ad.description
                                                    }
                                                </p>
                                                
                                                {/* Pet details */}
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 rounded-full bg-main-color bg-opacity-10 flex items-center justify-center mr-3">
                                                            <span className="material-icons text-main-color text-sm">
                                                                {ad.pet === 'cat' ? 'emoji_nature' : 'pets'}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Gatunek</p>
                                                            <p className="text-sm font-medium text-gray-900">{translatePetAttribute('pet', ad.pet)}</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 rounded-full bg-main-color bg-opacity-10 flex items-center justify-center mr-3">
                                                            <span className="material-icons text-main-color text-sm">cake</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Wiek</p>
                                                            <p className="text-sm font-medium text-gray-900">{translatePetAttribute('age', ad.age)}</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 rounded-full bg-main-color bg-opacity-10 flex items-center justify-center mr-3">
                                                            <span className="material-icons text-main-color text-sm">straighten</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Rozmiar</p>
                                                            <p className="text-sm font-medium text-gray-900">{translatePetAttribute('size', ad.size)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Location */}
                                                <div className="flex items-center text-gray-500 text-sm mb-6">
                                                    <span className="material-icons text-sm mr-2">location_on</span>
                                                    <span>{ad.voivodeship}, {ad.city}</span>
                                                </div>
                                            </div>
                                            
                                            {/* Action buttons */}
                                            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t justify-center items-center border-gray-100">
                                                <Link to={`/ads/${ad._id}`} className="flex-1">
                                                    <Button
                                                        size="normal"
                                                        style="primary"
                                                        text="Zobacz szczegóły"
                                                        type="button"
                                                    />
                                                </Link>
                                                <div className="flex-1">
                                                <Button 
                                                    size="normal" 
                                                    style="secondary" 
                                                    text="Usuń z ulubionych" 
                                                    onClick={() => deleteFavorites(ad._id)}
                                                    type="button"
                                                />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            {/* Tips section - consistent with SingleAd */}
            <div className="bg-main-color bg-opacity-10 py-8 mt-12">
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
}
export default FavoriteAd;