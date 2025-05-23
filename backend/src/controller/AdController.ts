import Ad from "../model/Ads";
import {Request,Response} from 'express'
import { getUserId } from "../service/AuthService";

export async function createAd(req:Request, res:Response) {
    const { title, description,note, images, pet, age, size, voivodeship, city, number } = req.body;
    const userId = await getUserId(req.cookies.token);

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
        res.status(201).json({ message: "Ogłoszenie dodane", adId: newAd._id });
    } catch (error) {
      console.log("error", error);
        res.status(400).json({ error: "Nie udało się dodać ogłoszenia" });
    }
  }
export async function getAds(req:Request, res:Response) {
    try {
        const ads = await Ad.find();
        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({ error: "Nie udało się pobrać ogłoszeń" });
    }
}
export async function singleAd(req: Request, res: Response) {
    try {
      const singleAd = await Ad.findOne({ _id: req.params.id });
      singleAd!.views += 1;
      await singleAd!.save();
      
  
      res.status(200).json(singleAd);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Nie udało się pobrać ogłoszenia" });
    }
  }
  export async function filterSearch(req: Request, res: Response){
    const {search, pet, size, voivodeship, city, age} = req.query as Record<string, string>;
    try {
      const filter: any = {};

      if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
      }
      
      if (pet) filter.pet = pet;
      if (size) filter.size = size;
      if (voivodeship) filter.voivodeship = voivodeship;
      if (city) filter.city = city;
      if (age) filter.age = age;

      const ads = await Ad.find(filter);
      console.log(ads);
      res.status(200).json(ads);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Nie udało się wyszukać ogłoszeń" });
    }
  }