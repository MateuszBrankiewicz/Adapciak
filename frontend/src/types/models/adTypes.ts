export interface ImageData {
    url: string;
    _id: string;
  }
  
  export interface AdData {
    _id: string;
    title: string;
    description: string;
    note: string;
    images: ImageData[];
    userId: string;
    views: number;
    voivodeship: string;
    city: string;
    number: string;
    pet: string;
    age: string;
    size: string;
    
    createdAt: string;
    updatedAt: string;
    __v: number;
  }