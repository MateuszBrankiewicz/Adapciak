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
type LoginFormSchema = z.infer<typeof loginFormSchema>;
export { loginFormSchema };
export type { LoginFormSchema };
