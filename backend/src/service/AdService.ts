import Ad from "../model/Ads";
import { Request } from 'express';
import { getUserId } from "./AuthService";
import { validationResult } from "express-validator";

// Interfejsy
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalAds: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

export interface PaginatedAdsResponse {
  ads: any[];
  pagination: PaginationInfo;
}

export interface AdFilterParams {
  search?: string;
  pet?: string;
  size?: string;
  voivodeship?: string;
  city?: string;
  age?: string;
  page?: string;
  limit?: string;
}

// Tworzenie nowego ogłoszenia
export const handleCreateAd = async (req: Request): Promise<{ message: string; adId: string }> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(`Błędy walidacji: ${JSON.stringify(errors.array())}`);
  }

  const { title, description, note, images, pet, age, size, voivodeship, city, number } = req.body;
  const userId = await getUserId(req.cookies.token);

  if (!userId) {
    throw new Error('Nie jesteś zalogowany');
  }

  const newAd = new Ad({
    title,
    description,
    note,
    userId,
    images,
    pet,
    age,
    size,
    voivodeship,
    city,
    number,
  });

  try {
    await newAd.save();
    return { message: "Ogłoszenie dodane", adId: newAd._id?.toString() || "" };
  } catch (error) {
    console.log("error", error);
    throw new Error("Nie udało się dodać ogłoszenia");
  }
};

// Pobieranie ogłoszeń z paginacją
export const handleGetAds = async (page: number = 1, limit: number = 2): Promise<PaginatedAdsResponse> => {
  try {
    const skip = (page - 1) * limit;

    const totalAds = await Ad.countDocuments();
    const ads = await Ad.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalAds / limit);

    return {
      ads,
      pagination: {
        currentPage: page,
        totalPages,
        totalAds,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        limit
      }
    };
  } catch (error) {
    throw new Error("Nie udało się pobrać ogłoszeń");
  }
};

// Pobieranie pojedynczego ogłoszenia
export const handleGetSingleAd = async (id: string) => {
  try {
    const singleAd = await Ad.findOne({ _id: id });
    
    if (!singleAd) {
      throw new Error("Ogłoszenie nie zostało znalezione");
    }

    singleAd.views += 1;
    await singleAd.save();

    return singleAd;
  } catch (error) {
    console.error(error);
    throw new Error("Nie udało się pobrać ogłoszenia");
  }
};

// Filtrowanie i wyszukiwanie ogłoszeń
export const handleFilterSearch = async (filters: AdFilterParams): Promise<PaginatedAdsResponse> => {
  try {
    const filter: any = {};
    const pageNum = parseInt(filters.page || '1') || 1;
    const limitNum = parseInt(filters.limit || '2') || 2;
    const skip = (pageNum - 1) * limitNum;

    // Budowanie filtra wyszukiwania
    if (filters.search) {
      filter.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } }
      ];
    }

    if (filters.pet) filter.pet = filters.pet;
    if (filters.size) filter.size = filters.size;
    if (filters.voivodeship) filter.voivodeship = filters.voivodeship;
    if (filters.city) filter.city = filters.city;
    if (filters.age) filter.age = filters.age;

    const totalAds = await Ad.countDocuments(filter);
    const ads = await Ad.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const totalPages = Math.ceil(totalAds / limitNum);

    return {
      ads,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalAds,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
        limit: limitNum
      }
    };
  } catch (error) {
    console.error(error);
    throw new Error("Nie udało się wyszukać ogłoszeń");
  }
};

// Pobieranie ogłoszeń użytkownika
export const handleGetUserAds = async (req: Request) => {
  try {
    const userId = await getUserId(req.cookies.token);
    
    if (!userId) {
      throw new Error("Nie jesteś zalogowany");
    }

    const ads = await Ad.find({ userId }).sort({ createdAt: -1 });
    return ads;
  } catch (error) {
    console.error(error);
    throw new Error("Nie udało się pobrać ogłoszeń użytkownika");
  }
};

// Aktualizacja ogłoszenia
export const handleUpdateAd = async (req: Request, id: string): Promise<{ message: string; ad: any }> => {
  try {
    const userId = await getUserId(req.cookies.token);

    if (!userId) {
      throw new Error("Nie jesteś zalogowany");
    }

    // Sprawdź czy ogłoszenie należy do użytkownika
    const existingAd = await Ad.findById(id);
    if (!existingAd) {
      throw new Error("Ogłoszenie nie zostało znalezione");
    }

    if (existingAd.userId.toString() !== userId) {
      throw new Error("Nie masz uprawnień do edycji tego ogłoszenia");
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(`Błędy walidacji: ${JSON.stringify(errors.array())}`);
    }

    const { title, description, note, images, pet, age, size, voivodeship, city, number } = req.body;

    const updatedAd = await Ad.findByIdAndUpdate(
      id,
      {
        title,
        description,
        note,
        images,
        pet,
        age,
        size,
        voivodeship,
        city,
        number,
        updatedAt: new Date()
      },
      { new: true }
    );

    return { message: "Ogłoszenie zaktualizowane", ad: updatedAd };
  } catch (error) {
    console.error("Error updating ad:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Nie udało się zaktualizować ogłoszenia");
  }
};
