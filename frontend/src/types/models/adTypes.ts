export interface ImageData {
    url: string;
    _id: string;
  }
  
   export interface Ad {
       
        _id: string;
        title: string;
        description: string;
        images: {
            url: string;
        }[];
        district: string;
        city: string;
        voivodeship: string;
        pet: string;
        age:string;
        size: string;
        number: string;
        note: string;
         views: number;
        createdAt: string;
    }

    export interface PaginationInfo {
        currentPage: number;
        totalPages: number;
        totalAds: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
        limit: number;
    }

    export interface PaginatedAdsResponse {
        ads: Ad[];
        pagination: PaginationInfo;
    }