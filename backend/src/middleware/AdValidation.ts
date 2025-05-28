import { body } from "express-validator";


export const validateAdCreation = [
    body('title')
        .notEmpty()
        .withMessage('Nazwa jest wymagana')
        .isLength({ min: 1 })
        .withMessage('Nazwa jest wymagana')
        .trim(),

    body('description')
        .notEmpty()
        .withMessage('Opis jest wymagany')
        .isLength({ min: 1 })
        .withMessage('Opis jest wymagany')
        .trim(),

    body('pet')
        .isIn(['dog', 'cat'])
        .withMessage('Wybierz gatunek'),

    body('age')
        .isIn(['puppy', 'adult', 'senior'])
        .withMessage('Wybierz wiek'),

    body('size')
        .isIn(['small', 'medium', 'large'])
        .withMessage('Wybierz rozmiar'),

    body('voivodeship')
        .notEmpty()
        .withMessage('Województwo jest wymagane')
        .isLength({ min: 1 })
        .withMessage('Województwo jest wymagane')
        .trim(),

    body('city')
        .notEmpty()
        .withMessage('Miasto jest wymagane')
        .isLength({ min: 1 })
        .withMessage('Miasto jest wymagane')
        .trim(),

    body('number')
        .isLength({ min: 9, max: 9 })
        .withMessage('Podaj poprawny numer')
        .isNumeric()
        .withMessage('Numer telefonu może zawierać tylko cyfry'),

    body('note')
        .notEmpty()
        .withMessage('Notka jest wymagana')
        .isLength({ min: 1 })
        .withMessage('Notka jest wymagana')
        .trim(),

 
];

export const validateAdUpdate = [
    body('title')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Nazwa jest wymagana')
        .trim(),

    body('description')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Opis jest wymagany')
        .trim(),

    body('pet')
        .optional()
        .isIn(['dog', 'cat'])
        .withMessage('Wybierz gatunek'),

    body('age')
        .optional()
        .isIn(['puppy', 'adult', 'senior'])
        .withMessage('Wybierz wiek'),

    body('size')
        .optional()
        .isIn(['small', 'medium', 'large'])
        .withMessage('Wybierz rozmiar'),

    body('voivodeship')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Województwo jest wymagane')
        .trim(),

    body('city')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Miasto jest wymagane')
        .trim(),

    body('number')
        .optional()
        .isLength({ min: 9, max: 9 })
        .withMessage('Podaj poprawny numer')
        .isNumeric()
        .withMessage('Numer telefonu może zawierać tylko cyfry'),

    body('note')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Notka jest wymagana')
        .trim(),
];