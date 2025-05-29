import NavigationBar from "../../components/layout/Navigation/NavigationBar";
import UniversalAdsList from "../../components/ui/AdsComponents/UniversalAdsList";
import UniversalAdCard, { CardVariant } from "../../components/ui/AdsComponents/UniversalAdCard";
import AddAdFloatingButton from "../../components/ui/AdsComponents/AddAdFloatingButton";
import PageHeader from "../../components/ui/common/PageHeader/PageHeader";
import { useUserAdsManagement } from "../../hooks/useUserAdsManagement";

const YourAdds = () => {
    const { userAds, isLoading, isError, handleDeleteAd } = useUserAdsManagement();

    return (
        <div className="w-full flex flex-col min-h-screen bg-gray-50">
            <NavigationBar />

            <div className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
                <PageHeader 
                    title="Twoje ogłoszenia"
                    subtitle="Zarządzaj swoimi ogłoszeniami adopcyjnymi"
                    showAddButton={true}
                    addButtonText="Dodaj nowe ogłoszenie"
                />

                <UniversalAdsList 
                    ads={userAds}
                    isLoading={isLoading}
                    isError={isError}
                    emptyStateProps={{
                        icon: "pets",
                        title: "Brak ogłoszeń",
                        description: "Nie masz jeszcze żadnych ogłoszeń adopcyjnych.",
                        actionButton: {
                            text: "Dodaj pierwsze ogłoszenie",
                            link: "/ads/add"
                        }
                    }}
                    errorStateProps={{
                        icon: "error_outline",
                        title: "Błąd ładowania",
                        description: "Nie udało się pobrać Twoich ogłoszeń. Spróbuj ponownie."
                    }}
                    renderCard={(ad, index) => (
                        <UniversalAdCard 
                            key={ad._id || index} 
                            ad={ad} 
                            variant={CardVariant.USER_OWNED}
                            onDelete={handleDeleteAd}
                        />
                    )}
                />

                <AddAdFloatingButton />
            </div>
        </div>
    );
};

export default YourAdds;