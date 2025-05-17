import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LoginFormSchema, RegisterFormSchema } from "../types/formSchemas";
import { UseFormSetError } from "react-hook-form";

const fetchMe = async () => {
  const response = await axios.get("http://localhost:3000/user/check", { withCredentials: true });
  return response;
}
export const checkToken = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    retry: false,
  });
}

const registerUser = async (userData: Omit<RegisterFormSchema, 'confirmPassword'>) => {
  const response = await axios.post("http://localhost:3000/user/register", userData);
  return response.data;
}
export const useRegisterUser = () => {
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      alert("Udało się zarejestrować");
      window.location.href = "/login";
    },
  });
  const handleSubmit = (data: RegisterFormSchema, setError: UseFormSetError<RegisterFormSchema>) => {
    const { confirmPassword, ...userData } = data;

    if (userData.password !== confirmPassword) {
      setError('confirmPassword', {
        message: 'Hasła nie są takie same.'
      });
      return;
    }
    mutation.mutate(userData, {
      onError: (error) => {
        console.log("Tu error: ", error);
        setError('email', {
          message: 'Istnieje już konto z takim kontem email.'
        });
      }
    });
  };
  return {
    registerUser: handleSubmit,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error
  };
};

const loginUser = async (userData: LoginFormSchema) => {
  const response = await axios.post("http://localhost:3000/user/login", userData,{ withCredentials: true});
  return response.data;
}

export const useLoginUser = () => {
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      alert("Udało się zalogować");
      const token = (data as { token: string }).token;
      window.location.href = "/ads";
    }
  });

  const handleSubmit = (data: LoginFormSchema, setError: UseFormSetError<LoginFormSchema>) => {
    // const { email, password } = data;
    mutation.mutate(data, {
      onError: (error) => {
        console.log("Tu error: ", error);
        setError('email', {
          message: 'Niepoprawny email lub hasło.'
        });
      }
    });
  };

  return {
    loginUser: handleSubmit,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error
  };
};
