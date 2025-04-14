import {Request,Response} from 'express'

export const getVoivodeships = async (req: Request, res: Response) => {
    const voivodeship = ["dolnośląskie", "kujawsko-pomorskie", "lubelskie", "lubuskie", "łódzkie", "małopolskie", "mazowieckie", "opolskie", "podkarpackie", "podlaskie", "pomorskie", "śląskie", "świętokrzyskie", "warmińsko-mazurskie", "wielkopolskie", "zachodniopomorskie"];
    res.status(200).json(voivodeship);
}