import { useQueryClient } from "@tanstack/react-query";
import { useCheckFavorite, useDeleteFavorite, usePostFavorite } from "../../../../hooks/api/adHooks"
import Button from "./Button";

interface FavoriteButtonProps {
  adId: string;
  userId: string; 
}

const FavoriteButton = ({ adId, userId }: FavoriteButtonProps ) => {
    const queryClient = useQueryClient()
    const { data: isFavorite, isLoading } = useCheckFavorite(adId);
    const { mutate: addToFavorites, isPending:isAdding } = usePostFavorite();
    const { mutate: deleteFromFavorites, isPending:isDeleting } = useDeleteFavorite();
    console.log(isFavorite);
        // Sprawdzamy czy trwa jakaś operacja
    const isPending = isLoading || isAdding || isDeleting;
    
    if (isLoading) {
        return <button className="px-4 py-2 rounded opacity-50">Loading...</button>;
    }  
    const isInFavorites = isFavorite 
     const toggleFavorite = () => {
        if (isPending) return; 
            console.log(userId)
        if (isInFavorites) {
            deleteFromFavorites(adId, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['checkFavorite', adId] });
                    queryClient.invalidateQueries({ queryKey: ['favorite'] });
                    
                    const successEvent = new CustomEvent('showNotification', { 
                      detail: { 
                        message: 'Usunięto z ulubionych!',
                        type: 'success'
                      } 
                    });
                    document.dispatchEvent(successEvent);
                }
            });
        } else {
            addToFavorites({ userId, ad: adId }, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['checkFavorite', adId] });
                    queryClient.invalidateQueries({ queryKey: ['favorite'] });
                    
                    const successEvent = new CustomEvent('showNotification', { 
                      detail: { 
                        message: 'Dodano do ulubionych!',
                        type: 'success'
                      } 
                    });
                    document.dispatchEvent(successEvent);
                },
                onError: (error) => {
                    console.error("Błąd dodawania do ulubionych:", error);
                    
              const errorEvent = new CustomEvent('showNotification', { 
                      detail: { 
                        message: 'Wystąpił błąd podczas dodawania do ulubionych',
                        type: 'error'
                      } 
                    });
                    document.dispatchEvent(errorEvent);
                }
            });
        }
    }
                    return (
    <Button 
      size="normal" 
      style="secondary" 
      text={isFavorite as boolean === true ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
      onClick={toggleFavorite}
    />
  );
}
export default FavoriteButton