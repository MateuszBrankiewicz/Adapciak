import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LoginFormSchema, RegisterFormSchema, EditProfileSchema, ChangePasswordSchema } from "../../types/schemas/formSchemas";
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
    onSuccess: () => {
      alert("Udało się zalogować");
      window.location.href = "/ads";
    }
  });

  const handleSubmit = (data: LoginFormSchema, setError: UseFormSetError<LoginFormSchema>) => {
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

const fetchUserProfile = async () => {
  const response = await axios.get("http://localhost:3000/userprofile/profile", { withCredentials: true });
  return response.data;
}

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    retry: false,
  });
}

const updateUserProfile = async (userData: EditProfileSchema) => {
  const response = await axios.put("http://localhost:3000/userprofile/profile", userData, { withCredentials: true });
  return response.data;
}

export const useUpdateProfile = () => {
  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      alert("Profil został zaktualizowany pomyślnie");
    },
  });

  const handleSubmit = (data: EditProfileSchema, setError: UseFormSetError<EditProfileSchema>) => {
    mutation.mutate(data, {
      onError: (error: any) => {
        console.log("Error updating profile: ", error);
        if (error.response?.data?.errors) {
          error.response.data.errors.forEach((err: any) => {
            setError(err.path as keyof EditProfileSchema, {
              message: err.msg
            });
          });
        } else {
          setError('firstName', {
            message: 'Nie udało się zaktualizować profilu.'
          });
        }
      }
    });
  };

  return {
    updateProfile: handleSubmit,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error
  };
};

const changePassword = async (passwordData: ChangePasswordSchema) => {
  const response = await axios.put("http://localhost:3000/userprofile/password", passwordData, { withCredentials: true });
  return response.data;
}

export const useChangePassword = () => {
  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      alert("Hasło zostało zmienione pomyślnie");
    },
  });

  const handleSubmit = (data: ChangePasswordSchema, setError: UseFormSetError<ChangePasswordSchema>) => {
    mutation.mutate(data, {
      onError: (error: any) => {
        console.log("Error changing password: ", error);
        if (error.response?.data === 'Aktualne hasło jest niepoprawne') {
          setError('currentPassword', {
            message: 'Aktualne hasło jest niepoprawne'
          });
        } else {
          setError('currentPassword', {
            message: 'Nie udało się zmienić hasła.'
          });
        }
      }
    });
  };

  return {
    changePassword: handleSubmit,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error
  };
};
