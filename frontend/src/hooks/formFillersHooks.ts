import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getVoivodeships = async () => {
    const response = await axios.get("http://localhost:3000/formFillers/voivodeships");
    
    return response.data as string[];
}

export const useVoivodeships = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["voivodeships"],
        queryFn: getVoivodeships,
        refetchOnWindowFocus: false,
    });

    return { data, isLoading, error };
}