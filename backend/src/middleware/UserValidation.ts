import { body } from "express-validator";
export const valiDateLogin = [
    body("email")
    .trim()
    .notEmpty().withMessage("Nie podano adresu email")
    .contains("@").withMessage("To nie jest poprawny adres email"),
    body("password")
    .trim()
    .notEmpty().withMessage("Nie podano hasła")
    .isLength({min:6}).withMessage("Hasło ma za mało znaków")
];
export const validateRegistration = [
    body("email")
        .trim()
        .notEmpty().withMessage("Nie podano adresu email")
        .isEmail().withMessage("To nie jest poprawny adres email"),
    body("password")
        .trim()
        .notEmpty().withMessage("Nie podano hasła")
        .isLength({min: 6}).withMessage("Hasło musi mieć co najmniej 6 znaków"),
    body("firstName")
        .trim()
        .notEmpty().withMessage("Nie podano imienia"),
    body("lastName")
        .trim()
        .notEmpty().withMessage("Nie podano nazwiska"),
    body("voivodeship")
        .trim()
        .notEmpty().withMessage("Nie podano wojewodztwa"),
    body("city")
        .trim()
        .notEmpty().withMessage("Nie podano miasta"),
    body("phone")
        .trim()
        .isLength({min:9,max:9}).withMessage("Podanio nie poprawny numer telefonu")
];

export const validateProfileUpdate = [
    body("firstName")
        .trim()
        .notEmpty().withMessage("Nie podano imienia"),
    body("lastName")
        .trim()
        .notEmpty().withMessage("Nie podano nazwiska"),
    body("voivodeship")
        .trim()
        .notEmpty().withMessage("Nie podano wojewodztwa"),
    body("city")
        .trim()
        .notEmpty().withMessage("Nie podano miasta"),
    body("phone")
        .trim()
        .isLength({min:9,max:9}).withMessage("Podano niepoprawny numer telefonu")
];

export const validatePasswordChange = [
    body("currentPassword")
        .trim()
        .notEmpty().withMessage("Nie podano aktualnego hasła"),
    body("newPassword")
        .trim()
        .notEmpty().withMessage("Nie podano nowego hasła")
        .isLength({min: 6}).withMessage("Nowe hasło musi mieć co najmniej 6 znaków"),
    body("confirmNewPassword")
        .trim()
        .notEmpty().withMessage("Nie potwierdzono nowego hasła")
];