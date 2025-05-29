import { useState } from "react";
import { UseFormSetError } from "react-hook-form";
import { Link } from "react-router-dom";
import Form2 from "../../components/ui/common/Form/Form2";
import InputComponent from "../../components/ui/common/Input/InputComponent";
import Button from "../../components/ui/common/Button/Button";
import SelectWithSearch from "../../components/ui/common/Select/SelectWithSearch";
import PageLayout from "../../components/ui/common/Layout/PageLayout";
import { useVoivodeships } from "../../hooks/formFillersHooks";
import { editProfileSchema, EditProfileSchema, changePasswordSchema, ChangePasswordSchema } from "../../types/schemas/formSchemas";
import { useUserProfile, useUpdateProfile, useChangePassword } from "../../hooks/api/authHooks";

interface UserProfileData {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    voivodeship: string;
    city: string;
}

const EditProfile = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
    
    const { data: profileData, isLoading: profileLoading, isError: profileError } = useUserProfile();
    const { data: voivodeships } = useVoivodeships();
    const { updateProfile, isLoading: updateLoading } = useUpdateProfile();
    const { changePassword, isLoading: passwordLoading } = useChangePassword();

    const userData = profileData as UserProfileData;

    const onSubmitProfile = async (data: EditProfileSchema, setError: UseFormSetError<EditProfileSchema>) => {
        updateProfile(data, setError);
    };

    const onSubmitPassword = async (data: ChangePasswordSchema, setError: UseFormSetError<ChangePasswordSchema>) => {
        changePassword(data, setError);
    };

    if (profileLoading) {
        return (
            <PageLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-main-color"></div>
                </div>
            </PageLayout>
        );
    }

    if (profileError) {
        return (
            <PageLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <span className="material-icons text-red-500 text-6xl mb-4">error_outline</span>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Błąd ładowania profilu</h2>
                        <p className="text-gray-600 mb-4">Nie udało się załadować danych profilu.</p>
                        <Link to="/ads" className="text-main-color hover:underline">
                            Powrót do strony głównej
                        </Link>
                    </div>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <div className="max-w-4xl mt-10 mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <Link to="/ads" className="text-main-color hover:text-blue-700 mr-4">
                            <span className="material-icons">arrow_back</span>
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-800">Edycja profilu</h1>
                    </div>
                    <p className="text-gray-600">
                        Zarządzaj swoimi danymi osobowymi i ustawieniami konta
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <div className="px-6">
                            <nav className="flex">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                        activeTab === 'profile'
                                            ? 'border-main-color text-main-color bg-blue-50'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <span className="material-icons mr-2">person</span>
                                        Dane osobowe
                                    </div>
                                </button>
                                <button
                                    onClick={() => setActiveTab('password')}
                                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                        activeTab === 'password'
                                            ? 'border-main-color text-main-color bg-blue-50'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <span className="material-icons mr-2">lock</span>
                                        Zmiana hasła
                                    </div>
                                </button>
                            </nav>
                        </div>
                    </div>

                    <div className="p-6">
                        {activeTab === 'profile' && (
                            <div>
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Dane osobowe</h2>
                                    <p className="text-gray-600 text-sm">
                                        Adres email nie może być zmieniony. Skontaktuj się z administratorem jeśli potrzebujesz zmienić adres email.
                                    </p>
                                </div>

                                <Form2 
                                    schema={editProfileSchema} 
                                    onSubmit={onSubmitProfile}
                                    formStyle="space-y-6"
                                    defaultValues={{
                                        firstName: userData?.firstName || "",
                                        lastName: userData?.lastName || "",
                                        phone: userData?.phone || "",
                                        voivodeship: userData?.voivodeship || "",
                                        city: userData?.city || "",
                                    }}
                                >
                                    {({ register, errors }) => (
                                        <>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={userData?.email || ""}
                                                    disabled
                                                    className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                                                />
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Adres email nie może być zmieniony
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputComponent
                                                    register={register}
                                                    type='text'
                                                    label='Imię'
                                                    placeholder='Wprowadź imię'
                                                    name="firstName"
                                                    error={errors.firstName}
                                                />
                                                
                                                <InputComponent
                                                    register={register}
                                                    type='text'
                                                    label='Nazwisko'
                                                    placeholder='Wprowadź nazwisko'
                                                    name="lastName"
                                                    error={errors.lastName}
                                                />
                                            </div>

                                            <InputComponent
                                                register={register}
                                                type='text'
                                                label='Telefon'
                                                placeholder='Wprowadź numer telefonu'
                                                name="phone"
                                                error={errors.phone}
                                            />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <SelectWithSearch
                                                    name="voivodeship"
                                                    register={register}
                                                    label="Województwo"
                                                    data={voivodeships || []}
                                                    value={userData.voivodeship}
                                                    placeholder="Wybierz województwo"
                                                    error={errors.voivodeship}
                                                />

                                                <InputComponent
                                                    register={register}
                                                    type='text'
                                                    label='Miasto'
                                                    placeholder='Wprowadź miasto'
                                                    name="city"
                                                    error={errors.city}
                                                />
                                            </div>

                                            <div className="flex justify-end pt-4">
                                                <Button
                                                    type="submit"
                                                    style="primary"
                                                    size="big"
                                                    text={updateLoading ? "Zapisywanie..." : "Zapisz zmiany"}
                                                />
                                            </div>
                                        </>
                                    )}
                                </Form2>
                            </div>
                        )}

                        {activeTab === 'password' && (
                            <div>
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Zmiana hasła</h2>
                                    <p className="text-gray-600 text-sm">
                                        Wprowadź aktualne hasło oraz nowe hasło, które chcesz ustawić.
                                    </p>
                                </div>

                                <Form2 schema={changePasswordSchema} onSubmit={onSubmitPassword} formStyle="space-y-6">
                                    {({ register, errors }) => (
                                        <>
                                            <InputComponent
                                                register={register}
                                                type='password'
                                                label='Aktualne hasło'
                                                placeholder='Wprowadź aktualne hasło'
                                                name="currentPassword"
                                                error={errors.currentPassword}
                                            />

                                            <InputComponent
                                                register={register}
                                                type='password'
                                                label='Nowe hasło'
                                                placeholder='Wprowadź nowe hasło'
                                                name="newPassword"
                                                error={errors.newPassword}
                                            />

                                            <InputComponent
                                                register={register}
                                                type='password'
                                                label='Potwierdź nowe hasło'
                                                placeholder='Powtórz nowe hasło'
                                                name="confirmNewPassword"
                                                error={errors.confirmNewPassword}
                                            />

                                            <div className="flex justify-end pt-4">
                                                <Button
                                                    type="submit"
                                                    style="primary"
                                                    size="big"
                                                    text={passwordLoading ? "Zmieniam hasło..." : "Zmień hasło"}
                                                />
                                            </div>
                                        </>
                                    )}
                                </Form2>
                            </div>
                        )}
                    </div>

               
                    <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-md">
                        <div className="flex items-center">
                            <span className="material-icons text-blue-500 mr-3">info</span>
                            <div>
                                <h3 className="text-sm font-medium text-blue-800">Informacja</h3>
                                <p className="text-sm text-blue-700 mt-1">
                                    Twoje dane są bezpieczne i używane tylko w celu obsługi platformy adopcyjnej.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default EditProfile;
