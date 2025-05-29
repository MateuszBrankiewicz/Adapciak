import UniversalAdsList from "../../components/ui/AdsComponents/UniversalAdsList";
import UniversalAdCard, { CardVariant } from "../../components/ui/AdsComponents/UniversalAdCard";
import { useDeleteFavorite, useFavorite } from "../../hooks/api/adHooks";
import { checkToken } from "../../hooks/api/authHooks";
import PageLayout from "../../components/ui/common/Layout/PageLayout";
import IconHeader from "../../components/ui/common/Header/IconHeader";
import TipsSection from "../../components/ui/common/Layout/TipsSection";
import { useEffect } from "react";

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
    
    useEffect(() => {
        console.log(favorites);
    });

    return (
        <PageLayout
            isLoading={isFavoritesLoading}
            isError={isFavoritesError}
            loadingMessage="Ładowanie ulubionych ogłoszeń..."
            errorTitle="Wystąpił błąd"
            errorDescription="Nie udało się załadować ulubionych ogłoszeń."
            errorAction={{
                text: "Spróbuj ponownie",
                onClick: () => window.location.reload()
            }}
            className="w-full min-h-screen bg-gray-50 flex flex-col"
        >
            <div className="flex-1">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <IconHeader
                        icon="favorite"
                        title="Ulubione ogłoszenia"
                        subtitle={`${favorites?.length || 0} zapisanych ogłoszeń`}
                    />

                    <UniversalAdsList
                        ads={favorites || []}
                        isLoading={isFavoritesLoading}
                        isError={isFavoritesError}
                        emptyStateProps={{
                            icon: "favorite_border",
                            title: "Brak ulubionych ogłoszeń",
                            description: "Nie masz jeszcze żadnych zapisanych ogłoszeń. Przejrzyj dostępne ogłoszenia i dodaj je do ulubionych.",
                            actionButton: {
                                text: "Przeglądaj ogłoszenia",
                                link: "/ads"
                            }
                        }}
                        errorStateProps={{
                            icon: "error_outline",
                            title: "Wystąpił błąd",
                            description: "Nie udało się załadować ulubionych ogłoszeń.",
                            actionButton: {
                                text: "Spróbuj ponownie",
                                onClick: () => window.location.reload()
                            }
                        }}
                        renderCard={(ad, index) => (
                            <UniversalAdCard 
                                key={ad._id || index} 
                                ad={ad} 
                                variant={CardVariant.FAVORITE}
                                onRemoveFromFavorites={deleteFavorites}
                            />
                        )}
                        className="space-y-6"
                    />
                </div>
            </div>
            
            <TipsSection
                tipText="Adopcja to poważna decyzja. Upewnij się, że jesteś gotowy na nowego członka rodziny."
                linkText="Dowiedz się więcej"
                linkUrl="#"
            />
        </PageLayout>
    );
}
export default FavoriteAd;