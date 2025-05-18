import { Link } from "react-router-dom";
import Button from "../../components/ui/common/Button/Button";
import { Slider } from "../../components/ui/common/Slider/Slider";
import { useDeleteFavorite, useFavorite } from "../../hooks/api/adHooks";
import { checkToken } from "../../hooks/api/authHooks";
import NavigationBar from "../../components/layout/Navigation/NavigationBar";

const FavoriteAd = () =>{ 
    const { data} = checkToken();
    const {mutate:deleteFromFavorites} = useDeleteFavorite()
    const deleteFavorites = (id : string) => {
        deleteFromFavorites(id)
    }
   const { 
        data: favorites, 
        isError: isFavoritesError,
       
    } = useFavorite(data?.data as string|| '');
    if(isFavoritesError){
       
        (
        <div>
            <div className="flex flex-col items-center justify-center py-12">
                <div className="text-red-500 text-5xl mb-4">
                    <span className="material-icons">error_outline</span>
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
        )
    }
    return (
        <>
        <NavigationBar/>
      <div className="space-y-6">
                    {favorites?.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-xl text-gray-500">Brak dostępnych ogłoszeń</p>
                        </div>
                    ) : (
                        favorites?.map((ad, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-2/5 p-4">
                                        <Slider data={ad.images.map((img) => img.url)} />
                                    </div>
                                    <div className="md:w-3/5 p-6 flex flex-col justify-between hover:bg-gray-50">
                                        <div  >
                                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{ad.title}</h2>
                                            <p className="text-gray-600 mb-4">{ad.description.length > 120 ?
                                                `${ad.description.substring(0, 120)}...` : ad.description}</p>
                                            <div className="flex items-center text-gray-500 text-sm">
                                                <span className="material-icons text-sm mr-1">location_on</span>
                                                <span>{ad.voivodeship}, {ad.city}</span>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                               <Link to={`/ads/${ad._id}`}>
                                            <button className="bg-main-color text-white px-4 py-2 rounded hover:brightness-95 transition">
                                                Zobacz więcej
                                            </button>
                                              </Link>
                                            <Button size ="small" style="secondary" text="Usun z ulubionych" onClick={() => deleteFavorites(ad._id)}></Button>
                                        </div>
                                        </div>
                                  
                                </div>
                            </div>
                        ))
                    )}
                </div>
                </>
    )
}
export default FavoriteAd;