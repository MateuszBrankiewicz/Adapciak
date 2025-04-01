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