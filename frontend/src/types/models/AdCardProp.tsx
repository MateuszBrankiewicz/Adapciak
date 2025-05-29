import { Ad } from "./adTypes";

export type AdCardProps = {
    ad: Ad;
    showEditButton? : boolean;
    showFavoriteButton?: boolean;
    showDeleteButton? :boolean;
    onEdit?: (id: string) => void;
    onDelete?: (id:string) => void;
    onFavoriteToggle?: (id:string) => void;
    variant?: "default" | "user-ads" | "favorites";

}