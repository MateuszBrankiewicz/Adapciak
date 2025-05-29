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
    voivodeship: z.string().min(1, "Wojewodztwo jest wymagane"),
    city: z.string().min(1,"Miasto jest wymagane"),
    phone: z.string().min(9,"Podaj poprawny numer telefonu(bez kierunkowego)").max(9,"Podaj poprawny numer telefonu(bez kierunkowego)"),
    firstName: z.string().min(1, "Imie jest wymagane"),
    lastName: z.string().min(1,"Nazwusko jest wymagane")
});
const adsAddSchema = z.object({
    title: z.string().min(1, "Nazwa jest wymagana"),
    description: z.string().min(1, "Opis jest wymagany"),
    
    pet: z.enum(["dog", "cat"], {
        errorMap: () => ({ message: "Wybierz gatunek" }),
    }),
    age: z.enum(["puppy", "adult", "senior"], {
        errorMap: () => ({ message: "Wybierz wiek" }),
    }),
    size: z.enum(["small", "medium", "large"], {
        errorMap: () => ({ message: "Wybierz rozmiar" }),
    }),
    voivodeship: z.string().min(1, "Województwo jest wymagane"),
    city: z.string().min(1, "Miasto jest wymagane"),
    number: z.string().min(9,"Podaj poprawny numer").max(9, "Podaj poprawny numer"),
    note: z.string().min(1, "Notka jest wymagana"),
    // contact: z.object({
    //     email: z.string().email("Podaj poprawny adres e-mail"),
    //     phone: z.string().min(9,"Podaj poprawny numer telefonu(bez kierunkowego)").max(9,"Podaj poprawny numer telefonu(bez kierunkowego)"),
    // }),
});
// Schema do edycji profilu (bez hasła)
const editProfileSchema = z.object({
    firstName: z.string().min(1, "Imie jest wymagane"),
    lastName: z.string().min(1,"Nazwisko jest wymagane"),
    phone: z.string().min(9,"Podaj poprawny numer telefonu(bez kierunkowego)").max(9,"Podaj poprawny numer telefonu(bez kierunkowego)"),
    voivodeship: z.string().min(1, "Wojewodztwo jest wymagane"),
    city: z.string().min(1,"Miasto jest wymagane"),
});

// Schema do zmiany hasła
const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(1, "Aktualne hasło jest wymagane."),
    newPassword: z
        .string()
        .min(6, "Nowe hasło musi mieć co najmniej 6 znaków.")
        .max(32, "Hasło może mieć maksymalnie 32 znaki."),
    confirmNewPassword: z
        .string()
        .min(1, "Potwierdzenie nowego hasła jest wymagane.")
        .max(32, "Hasło może mieć maksymalnie 32 znaki."),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Nowe hasła nie są takie same",
    path: ["confirmNewPassword"],
});

type AdsAddSchema = z.infer<typeof adsAddSchema>;
type LoginFormSchema = z.infer<typeof loginFormSchema>;
type RegisterFormSchema = z.infer<typeof registerFormSchema>;
type EditProfileSchema = z.infer<typeof editProfileSchema>;
type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export { loginFormSchema , registerFormSchema, adsAddSchema, editProfileSchema, changePasswordSchema};
export type { LoginFormSchema,  RegisterFormSchema, AdsAddSchema, EditProfileSchema, ChangePasswordSchema };
