import { useState } from "react";
import NavigationBar from "../../components/layout/Navigation/NavigationBar";
import { checkToken } from "../../hooks/api/authHooks";
import NavigationBarNoAuth from "../../components/layout/Navigation/NavigationBarNoAuth";
import SearchFilters from "../../components/ui/AdsComponents/SearchFilters";
import UniversalAdsList from "../../components/ui/AdsComponents/UniversalAdsList";
import UniversalAdCard, { CardVariant } from "../../components/ui/AdsComponents/UniversalAdCard";
import MobileSearchToggle from "../../components/ui/AdsComponents/MobileSearchToggle";
import PaginationSection from "../../components/ui/AdsComponents/PaginationSection";
import AddAdFloatingButton from "../../components/ui/AdsComponents/AddAdFloatingButton";
import { useAdsFilters } from "../../hooks/useAdsFilters";
import { useResponsive } from "../../hooks/useResponsive";

export default function ShowAds() {
    const [showSearch, setShowSearch] = useState(false);
    const { data, isError } = checkToken();
    const isLoggedIn = !isError;
    const { isMobile } = useResponsive();
    
    const {
        dataAds,
        pagination,
        filters,
        isLoading,
        updateFilter,
        handleFilters,
        handlePageChange
    } = useAdsFilters();

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
                    <>
                        <MobileSearchToggle 
                            showSearch={showSearch}
                            onToggle={() => setShowSearch(!showSearch)}
                        />
                        {showSearch && (
                            <SearchFilters
                                filters={filters}
                                updateFilter={updateFilter}
                                onApplyFilters={() => handleFilters(1)}
                                isMobile={true}
                            />
                        )}
                    </>
                ) : (
                    <SearchFilters
                        filters={filters}
                        updateFilter={updateFilter}
                        onApplyFilters={() => handleFilters(1)}
                        isMobile={false}
                    />
                )}

                <UniversalAdsList 
                    ads={dataAds}
                    isLoading={isLoading}
                    emptyStateProps={{
                        icon: "search_off",
                        title: "Brak ogłoszeń",
                        description: "Nie znaleziono ogłoszeń spełniających podane kryteria."
                    }}
                    renderCard={(ad, index) => (
                        <UniversalAdCard 
                            key={ad._id || index} 
                            ad={ad} 
                            variant={CardVariant.STANDARD}
                            isLoggedIn={isLoggedIn} 
                            userId={data?.data as string} 
                        />
                    )}
                />

                <PaginationSection
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                    hasAds={dataAds.length > 0}
                />

                <AddAdFloatingButton />
            </div>
        </div>
    );
}