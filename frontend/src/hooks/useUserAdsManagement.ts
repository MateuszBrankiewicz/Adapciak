import { useUserAds } from "../hooks/api/adHooks";
import { checkToken } from "../hooks/api/authHooks";
import axios from "axios";
interface UseUserAdsManagementReturn {
    userAds: any[];
    isLoading: boolean;
    isError: boolean;
    isLoggedIn: boolean;
    handleDeleteAd: (adId: string) => void;
}

export const useUserAdsManagement = (): UseUserAdsManagementReturn => {
    const { isError: authError } = checkToken();
    const isLoggedIn = !authError;
    const { data: userAds = [], isLoading, isError } = useUserAds();

    const handleDeleteAd = async (adId: string) => {
        try{
            const response = await axios.delete(`http://localhost:3000/ads/${adId}`, {withCredentials: true});
            return response.data; 
        }
       catch(err)
       {
        return err
       }
    };

    return {
        userAds,
        isLoading,
        isError,
        isLoggedIn,
        handleDeleteAd
    };
};
