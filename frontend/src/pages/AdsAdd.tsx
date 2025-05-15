import Form2 from "../components/Form2";
import InputComponent2 from "../components/InputComponent2";
import NavigationBar from "../components/NavigationBar";
import {AdsAddSchema, adsAddSchema} from "../types/formSchemas";
import Button from "../components/Button";
import {useState} from "react";
import axios from "axios";
import SelectWithSearch from "../components/SelectWithSearch";
import {useQuery} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const AdsAdd = () => {
    const navigate = useNavigate();
    const [base64Images, setBase64Images] = useState<string[]>(["", "", "", "", ""]);
    const [profileLocation, setUseProfileLocation] = useState(false);
    const [selectedImage, setSelectedImage] = useState(-1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");
    
    const getVoivodeships = useQuery({
        queryKey: ["voivodeships"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:3000/formFillers/voivodeships");
            return response.data as string[];
        },
    });
    
    const deleteSelectedImage = () => {
        if (selectedImage >= 0) {
            const updatedImages = [...base64Images];
            updatedImages[selectedImage] = "";
            setBase64Images(updatedImages);
            setSelectedImage(-1);
        }
    }
    
    const onSubmit = async (data: AdsAddSchema) => {
        setIsSubmitting(true);
        setSubmitError("");
        
        // Filtruj puste obrazy
        const nonEmptyImages = base64Images.filter(img => img !== "");
        
        if (nonEmptyImages.length === 0) {
            setSubmitError("Dodaj przynajmniej jedno zdjęcie");
            setIsSubmitting(false);
            return;
        }
        
        const completeData = {
            ...data,
            images: nonEmptyImages.map((image) => ({
                url: image,
            })),
        }
        
        try {
            const response = await axios.post("http://localhost:3000/ads/create", completeData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setSubmitSuccess(true);
            
            // Przekieruj po 2 sekundach
            setTimeout(() => {
                navigate("/ads");
            }, 2000);
            
        } catch (error: any) {
            console.error("Error adding ad:", error);
            setSubmitError(error.response?.data?.error || "Nie udało się dodać ogłoszenia");
        } finally {
            setIsSubmitting(false);
        }
    }
    
    const readImageToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    resolve(reader.result as string);
                } else {
                    reject(new Error("Failed to read file"));
                }
            };
            reader.onerror = () => {
                reject(new Error("Failed to read file"));
            };
            reader.readAsDataURL(file);
        });
    }

    const translatePetOptions = {
        cat: "Kot",
        dog: "Pies"
    };
    
    const translateAgeOptions = {
        puppy: "Szczeniak",
        adult: "Dorosły",
        senior: "Senior"
    };
    
    const translateSizeOptions = {
        small: "Mały",
        medium: "Średni",
        large: "Duży"
    };

    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-50">
            <NavigationBar />
            
            {submitSuccess ? (
                <div className="flex-1 flex items-center justify-center flex-col p-8">
                    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="material-icons text-green-500 text-3xl">check_circle</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Ogłoszenie dodane!</h2>
                        <p className="text-gray-600 mb-6">Twoje ogłoszenie zostało pomyślnie dodane i jest teraz dostępne dla innych użytkowników.</p>
                        <p className="text-gray-500 text-sm">Za chwilę zostaniesz przekierowany do listy ogłoszeń...</p>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center p-4 pb-16">
                    <div className="w-full max-w-6xl">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dodaj ogłoszenie</h1>
                            <p className="text-gray-600">Wypełnij formularz, aby opublikować nowe ogłoszenie adopcyjne</p>
                        </div>
                        
                        {submitError && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-md">
                                <div className="flex items-center">
                                    <span className="material-icons text-red-500 mr-3">error_outline</span>
                                    <p className="text-red-700">{submitError}</p>
                                </div>
                            </div>
                        )}
                        
                        <Form2 formStyle="w-full h-full" schema={adsAddSchema} onSubmit={onSubmit}>
                            {({register, errors}) => (
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Lewa kolumna - informacje o zwierzęciu */}
                                    <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-center mb-5">
                                            <div className="w-10 h-10 rounded-full bg-main-color bg-opacity-10 flex items-center justify-center mr-4">
                                                <span className="material-icons text-main-color">pets</span>
                                            </div>
                                            <h2 className="text-2xl font-semibold text-gray-800">Informacje o zwierzęciu</h2>
                                        </div>
                                        
                                        <div className="space-y-6">
                                            <InputComponent2 
                                                label="Tytuł ogłoszenia" 
                                                placeholder="Np. Przyjazny labrador szuka domu" 
                                                register={register}
                                                error={errors.title} 
                                                name="title" 
                                                type="text"
                                            />
                                            
                                            <div className="w-full">
                                                <label className="block text-gray-700 font-medium mb-2">Opis</label>
                                                <textarea
                                                    rows={6}
                                                    placeholder="Opisz zwierzę, jego charakter, zalety, wymagania. Im więcej informacji, tym lepiej."
                                                    id="description"
                                                    className={`w-full px-4 py-3 rounded-md border ${errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'} focus:ring-2 focus:ring-main-color focus:border-main-color transition-colors`}
                                                    {...register("description")}
                                                />
                                                {errors.description && (
                                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                                        <span className="material-icons text-sm mr-1">error_outline</span>
                                                        {errors.description.message}
                                                    </p>
                                                )}
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <SelectWithSearch
                                                        name="pet"
                                                        label="Rodzaj zwierzęcia"
                                                        placeholder="Wybierz rodzaj"
                                                        register={register}
                                                        data={Object.values(translatePetOptions)}
                                                        error={errors.pet}
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <SelectWithSearch
                                                        name="age"
                                                        label="Wiek"
                                                        placeholder="Wybierz wiek"
                                                        register={register}
                                                        data={Object.values(translateAgeOptions)}
                                                        error={errors.age}
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <SelectWithSearch
                                                        name="size"
                                                        label="Rozmiar"
                                                        placeholder="Wybierz rozmiar"
                                                        register={register}
                                                        data={Object.values(translateSizeOptions)}
                                                        error={errors.size}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="w-full">
                                                <label className="block text-gray-700 font-medium mb-2">Uwagi dla nowego właściciela</label>
                                                <textarea
                                                    rows={4}
                                                    placeholder="Np. wymagania dotyczące doświadczenia, warunków mieszkaniowych, czasu, itp."
                                                    id="note"
                                                    className={`w-full px-4 py-3 rounded-md border ${errors.note ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'} focus:ring-2 focus:ring-main-color focus:border-main-color transition-colors`}
                                                    {...register("note")}
                                                />
                                                {errors.note && (
                                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                                        <span className="material-icons text-sm mr-1">error_outline</span>
                                                        {errors.note.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Prawa kolumna - lokalizacja i zdjęcia */}
                                    <div className="space-y-6">
                                        {/* Sekcja lokalizacji */}
                                        <div className="bg-white rounded-lg shadow-md p-6">
                                            <div className="flex items-center mb-5">
                                                <div className="w-10 h-10 rounded-full bg-main-color bg-opacity-10 flex items-center justify-center mr-4">
                                                    <span className="material-icons text-main-color">place</span>
                                                </div>
                                                <h2 className="text-2xl font-semibold text-gray-800">Lokalizacja</h2>
                                            </div>
                                            
                                            <div className="space-y-4">
                                                <div className="flex items-center mb-4">
                                                    <div className="relative flex items-center cursor-pointer" onClick={() => setUseProfileLocation(!profileLocation)}>
                                                        <input
                                                            type="checkbox"
                                                            id="use-profile-location"
                                                            className="sr-only"
                                                            checked={profileLocation}
                                                            onChange={() => {}}
                                                        />
                                                        <div className={`w-5 h-5 border rounded transition-colors ${profileLocation ? 'bg-main-color border-main-color' : 'bg-white border-gray-300'}`}>
                                                            {profileLocation && (
                                                                <span className="material-icons text-white text-xs flex items-center justify-center h-full">check</span>
                                                            )}
                                                        </div>
                                                        <label htmlFor="use-profile-location" className="ml-2 text-gray-700">
                                                            Użyj danych z profilu
                                                        </label>
                                                    </div>
                                                </div>
                                                
                                                <SelectWithSearch
                                                    name="voivodeship"
                                                    label="Województwo"
                                                    placeholder="Wybierz województwo"
                                                    register={register}
                                                    data={getVoivodeships.data || ["Ładowanie województw..."]}
                                                    disabled={profileLocation}
                                                    error={errors.voivodeship}
                                                />
                                                
                                                <InputComponent2
                                                    name="city"
                                                    label="Miasto"
                                                    type="text"
                                                    placeholder="Np. Warszawa"
                                                    register={register}
                                                    disabled={profileLocation}
                                                    error={errors.city}
                                                />
                                                
                                                <InputComponent2
                                                    name="number"
                                                    label="Telefon kontaktowy"
                                                    type="text"
                                                    placeholder="Np. 123456789"
                                                    register={register}
                                                    disabled={profileLocation}
                                                    error={errors.number}
                                                />
                                            </div>
                                        </div>
                                        
                                        {/* Sekcja zdjęć */}
                                        <div className="bg-white rounded-lg shadow-md p-6">
                                            <div className="flex items-center mb-5">
                                                <div className="w-10 h-10 rounded-full bg-main-color bg-opacity-10 flex items-center justify-center mr-4">
                                                    <span className="material-icons text-main-color">photo_library</span>
                                                </div>
                                                <h2 className="text-2xl font-semibold text-gray-800">Zdjęcia</h2>
                                            </div>
                                            
                                            <p className="text-gray-600 mb-4">Dodaj zdjęcia zwierzęcia - im lepiej widoczne, tym większa szansa na adopcję.</p>
                                            
                                            <div className="grid grid-cols-3 gap-2 mb-4">
                                                {base64Images.map((data, idx) => (
                                                    <div 
                                                        key={idx} 
                                                        onClick={() => data !== "" && setSelectedImage(idx)}
                                                        className={`
                                                            relative aspect-square overflow-hidden rounded-lg border 
                                                            ${data === "" ? 'bg-gray-100 border-dashed border-gray-300 flex items-center justify-center' : 'cursor-pointer'}
                                                            ${selectedImage === idx ? 'ring-2 ring-main-color' : ''}
                                                        `}
                                                    >
                                                        {data === "" ? (
                                                            <span className="material-icons text-gray-400">add_photo_alternate</span>
                                                        ) : (
                                                            <>
                                                                <img 
                                                                    src={data} 
                                                                    alt={`Zdjęcie ${idx + 1}`}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                                {selectedImage === idx && (
                                                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                                                        <span className="material-icons text-white">check_circle</span>
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <div className="flex flex-col space-y-3">
                                                <input
                                                    type="file"
                                                    id="images"
                                                    name="images"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={async (event) => {
                                                        const files = event.target.files;
                                                        if (files && files.length > 0) {
                                                            const promises = Array.from(files).map(file => readImageToBase64(file));
                                                            try {
                                                                const results = await Promise.all(promises);
                                                                setBase64Images(results.slice(0, 5)); // Limit to 5 images
                                                            } catch (err) {
                                                                console.error("Error reading image files:", err);
                                                            }
                                                        }
                                                    }}
                                                    className="hidden"
                                                />
                                                
                                                <label
                                                    htmlFor="images"
                                                    className="w-full px-4 py-3 bg-main-color text-white font-medium rounded-md cursor-pointer flex items-center justify-center hover:bg-opacity-90 transition-colors"
                                                >
                                                    <span className="material-icons mr-2">upload</span>
                                                    Wybierz zdjęcia
                                                </label>
                                                
                                                {selectedImage >= 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={deleteSelectedImage}
                                                        className="w-full px-4 py-3 border border-red-500 text-red-500 font-medium rounded-md hover:bg-red-50 transition-colors flex items-center justify-center"
                                                    >
                                                        <span className="material-icons mr-2">delete</span>
                                                        Usuń wybrane zdjęcie
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Przycisk publikacji */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`
                                                w-full py-4 bg-main-color text-white font-medium text-lg rounded-md 
                                                ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'} 
                                                transition-colors flex items-center justify-center
                                            `}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="animate-spin mr-2 material-icons">refresh</span>
                                                    Dodawanie ogłoszenia...
                                                </>
                                            ) : (
                                                <>
                                                    <span className="material-icons mr-2">publish</span>
                                                    Opublikuj ogłoszenie
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Form2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdsAdd;