import { useState, useEffect } from "react";
import axios from "axios";
import { Ad, PaginatedAdsResponse, PaginationInfo } from "../types/models/adTypes";

interface UseAdsFiltersReturn {
    dataAds: Ad[];
    pagination: PaginationInfo;
    filters: {
        searchQuery: string;
        pet: string;
        size: string;
        voivodeship: string;
        age: string;
        city: string;
    };
    isLoading: boolean;
    updateFilter: (name: string, value: string) => void;
    handleFilters: (page?: number) => Promise<void>;
    fetchAds: (page?: number) => Promise<void>;
    handlePageChange: (page: number) => void;
}

export const useAdsFilters = (): UseAdsFiltersReturn => {
    const [dataAds, setData] = useState<Ad[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo>({
        currentPage: 1,
        totalPages: 1,
        totalAds: 0,
        hasNextPage: false,
        hasPrevPage: false,
        limit: 2
    });
    const [filters, setFilters] = useState({
        searchQuery: "",
        pet: "",
        size: "",
        voivodeship: "",
        age: "",
        city: ""
    });
    const [isLoading, setIsLoading] = useState(true);

    const updateFilter = (name: string, value: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const fetchAds = async (page: number = 1) => {
        setTimeout(() =>{},1000000);
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/ads?page=${page}`);
            const data = response.data as PaginatedAdsResponse; 
            setData(data.ads);
            setPagination(data.pagination);
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilters = async (page: number = 1) => {
        let query = "http://localhost:3000/ads/filter";
        const queryParams = [];

        if (filters.searchQuery) queryParams.push(`search=${encodeURIComponent(filters.searchQuery)}`);
        if (filters.pet) queryParams.push(`pet=${encodeURIComponent(filters.pet)}`);
        if (filters.size) queryParams.push(`size=${encodeURIComponent(filters.size)}`);
        if (filters.voivodeship) queryParams.push(`voivodeship=${encodeURIComponent(filters.voivodeship)}`);
        if (filters.age) queryParams.push(`age=${encodeURIComponent(filters.age)}`);
        if (filters.city) queryParams.push(`city=${encodeURIComponent(filters.city)}`);
        
        queryParams.push(`page=${page}`);

        if (queryParams.length > 0) {
            query += `?${queryParams.join("&")}`;
        }
        
        setIsLoading(true);
        try {
            const response = await axios.get(query);
            const data = response.data as PaginatedAdsResponse; 
            setData(data.ads);
            setPagination(data.pagination);
        } catch (error) {
            console.error("Error fetching filtered data:", error);
            setData([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        const hasActiveFilters = Object.values(filters).some(value => value !== "");
        
        if (hasActiveFilters) {
            handleFilters(page);
        } else {
            fetchAds(page);
        }
    };

    useEffect(() => {
        fetchAds(1);
    }, []);

    return {
        dataAds,
        pagination,
        filters,
        isLoading,
        updateFilter,
        handleFilters,
        fetchAds,
        handlePageChange
    };
};
