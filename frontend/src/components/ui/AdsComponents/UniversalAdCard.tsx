import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { Slider } from "../common/Slider/Slider";
import Button from "../common/Button/Button";
import FavoriteButton from "../common/Button/FavoriteButton";
import { Ad } from "../../../types/models/adTypes";

// Enum dla różnych wariantów karty
export enum CardVariant {
    STANDARD = "standard",        // Standardowa karta ogłoszenia (AdCard)
    USER_OWNED = "user_owned",    // Karta ogłoszenia użytkownika (UserAdCard)
    FAVORITE = "favorite"         // Karta ulubionego ogłoszenia (FavoriteAdCard)
}

interface CardAction {
    label: string;
    variant: "primary" | "secondary";
    onClick?: () => void;
    link?: string;
    size?: "normal" | "normal" | "small";
}

interface UniversalAdCardProps {
    ad: Ad;
    variant: CardVariant;
    isLoggedIn?: boolean;
    userId?: string;
    onDelete?: (adId: string) => void;
    onRemoveFromFavorites?: (adId: string) => void;
    customActions?: CardAction[];
    additionalInfo?: ReactNode;
    className?: string;
}

const UniversalAdCard = ({
    ad,
    variant,
    isLoggedIn = false,
    userId,
    onDelete,
    onRemoveFromFavorites,
    customActions = [],
    additionalInfo,
    className = ""
}: UniversalAdCardProps) => {
    
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

    const handleDelete = () => {
        if (confirm("Czy na pewno chcesz usunąć to ogłoszenie?")) {
            onDelete?.(ad._id);
        }
    };

    const getActions = (): CardAction[] => {
        const baseActions: CardAction[] = [];

        switch (variant) {
            case CardVariant.STANDARD:
                baseActions.push({
                    label: "Zobacz więcej",
                    variant: "primary",
                    link: `/ads/${ad._id}`,
                    size: "normal"
                });
                break;

            case CardVariant.USER_OWNED:
                baseActions.push(
                    {
                        label: "Edytuj",
                        variant: "primary",
                        link: `/ads/edit/${ad._id}`,
                        size: "normal"
                    },
                    {
                        label: "Usuń",
                        variant: "secondary",
                        onClick: handleDelete,
                        size: "normal"
                    }
                );
                break;

            case CardVariant.FAVORITE:
                baseActions.push(
                    {
                        label: "Zobacz szczegóły",
                        variant: "primary",
                        link: `/ads/${ad.adId}`,
                        size: "normal"
                    },
                    {
                        label: "Usuń z ulubionych",
                        variant: "secondary",
                        onClick: () => onRemoveFromFavorites?.(ad._id),
                        size: "normal"
                    }
                );
                break;
        }

        return [...baseActions, ...customActions];
    };

    const renderActions = () => {
        const actions = getActions();
        const hasMultipleActions = actions.length > 1;
        const hasFavoriteButton = variant === CardVariant.STANDARD && isLoggedIn && userId;
        
        return (
            <div className={`w-full mt-5 ${
                variant === CardVariant.FAVORITE ? 'pt-4 border-t border-gray-100' : ''
            }`}>
                {/* Kontener dla wszystkich przycisków */}
                <div className={`flex w-full gap-2 ${
                    variant === CardVariant.FAVORITE ? 
                        'flex-col sm:flex-row' : 
                        hasMultipleActions || hasFavoriteButton ? 
                            'flex-col sm:flex-row' : 
                            'flex-row'
                }`}>
                    {/* Przyciski akcji */}
                    {actions.map((action, index) => (
                        <div key={index} className={`${
                            variant === CardVariant.FAVORITE || hasMultipleActions || hasFavoriteButton ? 
                                'flex-1' : 'w-full'
                        }`}>
                            {action.link ? (
                                <Link to={action.link} className="block w-full">
                                    <Button
                                        size={action.size || "normal"}
                                        style={action.variant}
                                        text={action.label}
                                        type="button"
                                        
                                    />
                                </Link>
                            ) : (
                                <Button
                                    size={action.size || "normal"}
                                    style={action.variant}
                                    text={action.label}
                                    type="button"
                                    onClick={action.onClick}
                                    
                                />
                            )}
                        </div>
                    ))}
                    
                    {/* Przycisk ulubionych dla wariantu STANDARD */}
                    {hasFavoriteButton && (
                        <div className="flex-1">
                            <FavoriteButton adId={ad._id} userId={userId} />
                        </div>
                    )}
                </div>
            </div>
        );
    };
    const renderPetDetails = () => {
        if (variant === CardVariant.FAVORITE) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-main-color bg-opacity-10 flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="material-icons text-main-color text-sm">
                                {ad.pet === 'cat' ? 'emoji_nature' : 'pets'}
                            </span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-500">Gatunek</p>
                            <p className="text-sm font-medium text-gray-900 truncate">{translatePetAttribute('pet', ad.pet)}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-main-color bg-opacity-10 flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="material-icons text-main-color text-sm">cake</span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-500">Wiek</p>
                            <p className="text-sm font-medium text-gray-900 truncate">{translatePetAttribute('age', ad.age)}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-main-color bg-opacity-10 flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="material-icons text-main-color text-sm">straighten</span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-500">Rozmiar</p>
                            <p className="text-sm font-medium text-gray-900 truncate">{translatePetAttribute('size', ad.size)}</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">
                        {translatePetAttribute('age', ad.age)}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">
                        {translatePetAttribute('size', ad.size)}
                    </span>
                </div>
            );
        }
    };

    const renderHeader = () => {
        const titleSize = variant === CardVariant.FAVORITE ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl";
        
        return (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                <h2 className={`${titleSize} font-bold text-gray-800 leading-tight`}>{ad.title}</h2>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm sm:text-base text-white bg-main-color px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                        {translatePetAttribute('pet', ad.pet)}
                    </span>
                    {variant === CardVariant.USER_OWNED && (
                        <div className="flex items-center text-gray-500 text-sm">
                            <span className="material-icons text-base mr-1">visibility</span>
                            <span>{ad.views || 0}</span>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const getContainerStyles = () => {
        const baseStyles = "bg-white rounded-lg overflow-hidden border transition-shadow";
        
        switch (variant) {
            case CardVariant.FAVORITE:
                return `${baseStyles} shadow-sm border-gray-100 hover:shadow-md`;
            default:
                return `${baseStyles} shadow-lg border-gray-200 hover:shadow-xl`;
        }
    };

    const getDescriptionLength = () => {
        switch (variant) {
            case CardVariant.FAVORITE:
                return 150;
            default:
                return 200;
        }
    };

    const renderLocation = () => {
        const textSize = variant === CardVariant.FAVORITE ? "text-sm" : "text-base";
        const iconSize = variant === CardVariant.FAVORITE ? "text-sm" : "text-xl";
        
        return (
            <div className={`flex items-center text-gray-500 ${textSize} mb-${variant === CardVariant.FAVORITE ? '6' : '4'}`}>
                <span className={`material-icons ${iconSize} mr-2`}>location_on</span>
                <span className="font-medium">{ad.voivodeship}, {ad.city}</span>
            </div>
        );
    };

    return (
        <div className={`${getContainerStyles()} ${className}`}>
            <div className={`flex flex-col ${variant === CardVariant.FAVORITE ? 'lg:flex-row' : 'md:flex-row'}`}>
                {/* Sekcja zdjęcia */}
                <div className={`${variant === CardVariant.FAVORITE ? 'lg:w-2/5 p-4 lg:p-6' : 'md:w-2/5 p-4 md:p-5'}`}>
                    <div className={`${variant === CardVariant.FAVORITE ? 'h-48 sm:h-56 lg:h-auto rounded-lg' : 'h-48 sm:h-64 md:h-80 rounded-lg'} overflow-hidden`}>
                        <Slider data={ad.images.map((img) => img.url)} />
                    </div>
                </div>
                
                {/* Sekcja treści */}
                <div className={`${variant === CardVariant.FAVORITE ? 'lg:w-3/5 p-4 lg:p-6' : 'md:w-3/5 p-4 md:p-7'} flex flex-col justify-between`}>
                    <div>
                        {renderHeader()}
                        
                        <p className={`${variant === CardVariant.FAVORITE ? 'text-gray-600 leading-relaxed text-sm sm:text-base' : 'text-base sm:text-lg text-gray-600'} mb-${variant === CardVariant.FAVORITE ? '4' : '6'}`}>
                            {ad.description && ad.description.length > getDescriptionLength()
                                ? `${ad.description.substring(0, getDescriptionLength())}...`
                                : ad.description}
                        </p>
                        
                        {renderLocation()}
                        {renderPetDetails()}
                        
                        {/* Data utworzenia dla karty użytkownika */}
                        {variant === CardVariant.USER_OWNED && (
                            <div className="flex items-center text-gray-500 text-sm mb-4">
                                <span className="material-icons text-base mr-1">schedule</span>
                                <span>Dodano: {new Date(ad.createdAt || "").toLocaleDateString('pl-PL')}</span>
                            </div>
                        )}
                        
                        {additionalInfo}
                    </div>
                    
                    {renderActions()}
                </div>
            </div>
        </div>
    );
};

export default UniversalAdCard;
