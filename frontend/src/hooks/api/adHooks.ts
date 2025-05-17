import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AdData } from "../types/adTypes";
const fetchAd = async (id: string): Promise<AdData> => {
    const response = await axios.get<AdData>(`http://localhost:3000/ads/${id}`);
    return response.data;
  };
export const useAd = (id: string) => {
    return useQuery<AdData>({
      queryKey: ["singleAd", id],
      queryFn: () => fetchAd(id),
      enabled: !!id,
      retry: false
    });
  };
