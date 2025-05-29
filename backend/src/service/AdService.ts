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
export const handleCreateAd = async (req: Request): Promise<{ status: number; message: any }> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return { status: 400, message: `Błędy walidacji: ${JSON.stringify(errors.array())}` };
    }

    const { title, description, note, images, pet, age, size, voivodeship, city, number } = req.body;
    const userId = await getUserId(req.cookies.token);

    if (!userId) {
      return { status: 401, message: 'Nie jesteś zalogowany' };
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

    const savedAd = await newAd.save();
    return { status: 201, message: { message: "Ogłoszenie dodane", adId: savedAd._id?.toString() || "" } };
  } catch (error) {
    console.log("error", error);
    return { status: 500, message: "Nie udało się dodać ogłoszenia" };
  }
};

// Pobieranie ogłoszeń z paginacją
export const handleGetAds = async (page: number = 1, limit: number = 2): Promise<{ status: number; message: any }> => {
  try {
    const skip = (page - 1) * limit;

    const totalAds = await Ad.countDocuments();
    const ads = await Ad.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalAds / limit);

    const result: PaginatedAdsResponse = {
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

    return { status: 200, message: result };
  } catch (error) {
    return { status: 500, message: "Nie udało się pobrać ogłoszeń" };
  }
};

// Pobieranie pojedynczego ogłoszenia
export const handleGetSingleAd = async (id: string): Promise<{ status: number; message: any }> => {
  try {
    const singleAd = await Ad.findOne({ _id: id });
    
    if (!singleAd) {
      return { status: 404, message: "Ogłoszenie nie zostało znalezione" };
    }

    singleAd.views += 1;
    await singleAd.save();

    return { status: 200, message: singleAd };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Nie udało się pobrać ogłoszenia" };
  }
};

// Filtrowanie i wyszukiwanie ogłoszeń
export const handleFilterSearch = async (filters: AdFilterParams): Promise<{ status: number; message: any }> => {
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

    const result: PaginatedAdsResponse = {
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

    return { status: 200, message: result };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Nie udało się wyszukać ogłoszeń" };
  }
};

// Pobieranie ogłoszeń użytkownika
export const handleGetUserAds = async (req: Request): Promise<{ status: number; message: any }> => {
  try {
    const userId = await getUserId(req.cookies.token);
    
    if (!userId) {
      return { status: 401, message: "Nie jesteś zalogowany" };
    }

    const ads = await Ad.find({ userId }).sort({ createdAt: -1 });
    return { status: 200, message: ads };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Nie udało się pobrać ogłoszeń użytkownika" };
  }
};

// Aktualizacja ogłoszenia
export const handleUpdateAd = async (req: Request, id: string): Promise<{ status: number; message: any }> => {
  try {
    const userId = await getUserId(req.cookies.token);

    if (!userId) {
      return { status: 401, message: "Nie jesteś zalogowany" };
    }

    // Sprawdź czy ogłoszenie należy do użytkownika
    const existingAd = await Ad.findById(id);
    if (!existingAd) {
      return { status: 404, message: "Ogłoszenie nie zostało znalezione" };
    }

    if (existingAd.userId.toString() !== userId) {
      return { status: 403, message: "Nie masz uprawnień do edycji tego ogłoszenia" };
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return { status: 400, message: `Błędy walidacji: ${JSON.stringify(errors.array())}` };
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

    return { status: 200, message: { message: "Ogłoszenie zaktualizowane", ad: updatedAd } };
  } catch (error) {
    console.error("Error updating ad:", error);
    return { status: 500, message: "Nie udało się zaktualizować ogłoszenia" };
  }
};
export const handleDeleteAd = async (req: Request, id: string): Promise<{ status: number; message: any }> => {
  try {
    const userId = await getUserId(req.cookies.token);

    if (!userId) {
      return { status: 401, message: "Nie jesteś zalogowany" };
    }

    // Sprawdź czy ogłoszenie istnieje i należy do użytkownika
    const existingAd = await Ad.findById(id);
    if (!existingAd) {
      return { status: 404, message: "Ogłoszenie nie zostało znalezione" };
    }

    if (existingAd.userId.toString() !== userId) {
      return { status: 403, message: "Nie masz uprawnień do usunięcia tego ogłoszenia" };
    }

    const deletedAd = await Ad.findByIdAndDelete(id);
    return { status: 200, message: { message: "Ogłoszenie zostało usunięte", ad: deletedAd } };
  } catch (error) {
    console.error("Error deleting ad:", error);
    return { status: 500, message: "Nie udało się usunąć ogłoszenia" };
  }
};