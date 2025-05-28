import { Request, Response } from 'express'
import {
  handleCreateAd,
  handleGetAds,
  handleGetSingleAd,
  handleFilterSearch,
  handleGetUserAds,
  handleUpdateAd,
  AdFilterParams
} from "../service/AdService";

export async function createAd(req: Request, res: Response) {
  try {
    const result = await handleCreateAd(req);
     res.status(201).json(result);
  } catch (error) {
    const errorMessage = (error as Error).message;
    
    if (errorMessage.includes('Błędy walidacji')) {
       res.status(401).json({ errors: JSON.parse(errorMessage.replace('Błędy walidacji: ', '')) });
       return 
    } else if (errorMessage.includes('Nie jesteś zalogowany')) {
      res.status(401).json({ error: errorMessage });
      return 
    } else {
      res.status(400).json({ error: errorMessage });
      return 
    }
  }
}
export async function getAds(req: Request, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 2;

        const result = await handleGetAds(page, limit);
         res.status(200).json(result);
    } catch (error) {
         res.status(500).json({ error: (error as Error).message });
         return
    }
}
export async function singleAd(req: Request, res: Response) {
    try {
        const singleAd = await handleGetSingleAd(req.params.id);
         res.status(200).json(singleAd);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
        return 
    }
}
  export async function filterSearch(req: Request, res: Response){
    const {search, pet, size, voivodeship, city, age, page, limit} = req.query as Record<string, string>;
    try {
      const filters: AdFilterParams = {
        search, pet, size, voivodeship, city, age, page, limit
      };
      
      const result = await handleFilterSearch(filters);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
     res.status(500).json({ error: (error as Error).message });
      return 
    }
  }
  export async function getUserAds(req: Request, res: Response) {
    try {
        const ads = await handleGetUserAds(req);
         res.status(200).json(ads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
        return;
    }
}

export async function updateAd(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await handleUpdateAd(req, id);
         res.status(200).json(result);
    } catch (error) {
        const errorMessage = (error as Error).message;
        
        if (errorMessage.includes('Błędy walidacji')) {
            res.status(400).json({ errors: JSON.parse(errorMessage.replace('Błędy walidacji: ', '')) });
             return;
        } else if (errorMessage.includes('Nie jesteś zalogowany')) {
            res.status(401).json({ error: errorMessage });
             return;
        } else if (errorMessage.includes('Ogłoszenie nie zostało znalezione')) {
          res.status(404).json({ error: errorMessage });
             return;
        } else if (errorMessage.includes('Nie masz uprawnień')) {
            res.status(403).json({ error: errorMessage });
             return;
        } else {
            res.status(500).json({ error: errorMessage });
            return; 
        }
    }
}