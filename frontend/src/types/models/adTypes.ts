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
        size: string
    }