import {z} from "zod";

const loginFormSchema = z.object({
    email: z
        .string()
        .min(1, "Adres email jest wymagany.")
        .email("Podaj poprawny adres e-mail"),
    password: z
        .string()
        .min(1, "Hasło jest wymagane.")
        .max(32, "Hasło może mieć maksymalnie 32 znaki.")
    
});
const registerFormSchema = z.object({
    email: z
        .string()
        .min(1, "Adres email jest wymagany.")
        .email("Podaj poprawny adres e-mail"),
    password: z
        .string()
        .min(1, "Hasło jest wymagane.")
        .max(32, "Hasło może mieć maksymalnie 32 znaki."),
    confirmPassword: z
        .string()
        .min(1, "Potwierdzenie hasła jest wymagane.")
        .max(32, "Hasło może mieć maksymalnie 32 znaki."),
    street: z.string().min(1,"Ulica jest wymagana"),
    postalCode: z.string().regex(/^\d{2}-\d{3}$/, "Niepoprawny kod pocztowy"),
    province: z.string().min(1, "Wojewodztwo jest wymagane"),
    city: z.string().min(1,"Miasto jest wymagane"),
    homeNumber: z.string().min(1,"Numer jest wymagany"),
    phone: z.string().min(9,"Podaj poprawny numer telefonu(bez kierunkowego)").max(9,"Podaj poprawny numer telefonu(bez kierunkowego)"),
    firstName: z.string().min(1, "Imie jest wymagane"),
    lastName: z.string().min(1,"Nazwusko jest wymagane")
});
const adsAddSchema = z.object({
    title: z.string().min(1, "Nazwa jest wymagana"),
    description: z.string().min(1, "Opis jest wymagany"),
    location: z.string().min(1, "Lokalizacja jest wymagana"),
    pet: z.enum(["dog", "cat"], {
        errorMap: () => ({ message: "Wybierz gatunek" }),
    }),
    age: z.enum(["puppy", "adult", "senior"], {
        errorMap: () => ({ message: "Wybierz wiek" }),
    }),
    size: z.enum(["small", "medium", "large"], {
        errorMap: () => ({ message: "Wybierz rozmiar" }),
    }),
    
    // contact: z.object({
    //     email: z.string().email("Podaj poprawny adres e-mail"),
    //     phone: z.string().min(9,"Podaj poprawny numer telefonu(bez kierunkowego)").max(9,"Podaj poprawny numer telefonu(bez kierunkowego)"),
    // }),
});
type AdsAddSchema = z.infer<typeof adsAddSchema>;
type LoginFormSchema = z.infer<typeof loginFormSchema>;
type RegisterFormSchema = z.infer<typeof registerFormSchema>;
export { loginFormSchema , registerFormSchema, adsAddSchema};
export type { LoginFormSchema,  RegisterFormSchema, AdsAddSchema };
