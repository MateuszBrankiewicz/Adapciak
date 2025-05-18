import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Ad } from "../../types/models/adTypes";
const fetchAd = async (id: string): Promise<Ad> => {
    const response = await axios.get<Ad>(`http://localhost:3000/ads/${id}`);
    return response.data;
  };
export const useAd = (id: string) => {
    return useQuery<Ad>({
      queryKey: ["singleAd", id],
      queryFn: () => fetchAd(id),
      enabled: !!id,
      retry: false
    });
  };

const addFavorite = async(userId?: string, ad?: string) :Promise<unknown> => {
  if (!userId || !ad) throw new Error("Missing userId or ad data");
  
  const response = await axios.post("http://localhost:3000/favorite", { 
    userId, 
    ad: ad 
  }, {withCredentials:true});
  return response.data;
}
const getFavorite = async (userId:string) : Promise<Ad[]> => {
  const response = await  axios.get<Ad[]>(`http://localhost:3000/favorite/${userId}`, {withCredentials:true});
  return response.data;
}
export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`http://localhost:3000/favorite/${id}`,{withCredentials:true});
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite"] });
      console.log("Favorite deleted successfully");
      const successEvent = new CustomEvent('showNotification', { 
        detail: { 
          message: 'Ad removed from favorites!',
          type: 'success'
        } 
      });
      document.dispatchEvent(successEvent);
    },
  });
};
export const useCheckFavorite = (favoriteId: string) => {
  return useQuery({
    queryKey: ['checkFavorite', favoriteId],
    queryFn: async () => {
      if (!favoriteId ) return { message: false };
      
      try {
        const response = await axios.get(
          `http://localhost:3000/favorite/check/${favoriteId}`,
          {withCredentials: true}
        );
        return response.data;
      } catch (error) {
        console.error("Error checking favorite status:", error);
        return { message: false };
      }
    },
    enabled: !!favoriteId ,
    // Refetch when needed
    staleTime: 10000 // 10 seconds
  });
};
export const useFavorite = (userId: string) => {
  return useQuery({
    queryKey: ["favorite", userId],
    queryFn: () => getFavorite(userId),
    enabled: !!userId,
  });
}
export const usePostFavorite = () => {
  return useMutation({
    mutationFn: ({ userId, ad }: { userId?: string, ad?: string }) => {
      if (!userId || !ad) throw new Error("Missing userId or ad data");
      return addFavorite(userId, ad);
    },
    onSuccess: () => {
      console.log("Ad added to favorites successfully");
      const successEvent = new CustomEvent('showNotification', { 
        detail: { 
          message: 'Ad added to favorites successfully!',
          type: 'success'
        } 
      });
      document.dispatchEvent(successEvent);
    },
    onError: (error) => {
      console.error("Failed to add favorite:", error);
    }
  });
}