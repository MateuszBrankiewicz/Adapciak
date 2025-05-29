import { Request, Response } from 'express'
import {
  handleCreateAd,
  handleGetAds,
  handleGetSingleAd,
  handleFilterSearch,
  handleGetUserAds,
  handleUpdateAd,
  handleDeleteAd,
  AdFilterParams
} from "../service/AdService";

export async function createAd(req: Request, res: Response) {
  const result = await handleCreateAd(req);
  res.status(result.status).json(result.message);
}

export async function getAds(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 2;

  const result = await handleGetAds(page, limit);
  res.status(result.status).json(result.message);
}

export async function singleAd(req: Request, res: Response) {
  const result = await handleGetSingleAd(req.params.id);
  res.status(result.status).json(result.message);
}

export async function filterSearch(req: Request, res: Response) {
  const { search, pet, size, voivodeship, city, age, page, limit } = req.query as Record<string, string>;
  
  const filters: AdFilterParams = {
    search, pet, size, voivodeship, city, age, page, limit
  };
  
  const result = await handleFilterSearch(filters);
  res.status(result.status).json(result.message);
}

export async function getUserAds(req: Request, res: Response) {
  const result = await handleGetUserAds(req);
  res.status(result.status).json(result.message);
}

export async function updateAd(req: Request, res: Response) {
  const { id } = req.params;
  const result = await handleUpdateAd(req, id);
  res.status(result.status).json(result.message);
}

export async function deleteAd(req: Request, res: Response) {
  const { id } = req.params;
  const result = await handleDeleteAd(req, id);
  res.status(result.status).json(result.message);
}