import Form2 from "../../components/ui/common/Form/Form2";
import {AdsAddSchema, adsAddSchema} from "../../types/schemas/formSchemas";
import {useState} from "react";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/ui/common/Layout/PageLayout";
import SuccessState from "../../components/ui/common/PageState/SuccessState";
import LocationSection from "../../components/ui/common/FormSections/LocationSection";
import ImagesSection from "../../components/ui/common/FormSections/ImagesSection";
import PetInfoSection from "../../components/ui/common/FormSections/PetInfoSection";
import IconHeader from "../../components/ui/common/Header/IconHeader";

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
    
    const onSubmit = async (data: AdsAddSchema) => {
                console.log(data);

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
            await axios.post("http://localhost:3000/ads/create", completeData, {
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

    return (
        <PageLayout className="w-full min-h-screen flex flex-col bg-gray-50">
            {submitSuccess ? (
                <SuccessState
                    title="Ogłoszenie dodane!"
                    description="Twoje ogłoszenie zostało pomyślnie dodane i jest teraz dostępne dla innych użytkowników."
                    additionalInfo="Za chwilę zostaniesz przekierowany do listy ogłoszeń..."
                />
            ) : (
                <div className="flex-1 flex flex-col items-center p-4 pb-16">
                    <div className="w-full max-w-6xl">
                        <IconHeader
                            icon="add_circle"
                            title="Dodaj ogłoszenie"
                            subtitle="Wypełnij formularz, aby opublikować nowe ogłoszenie adopcyjne"
                        />
                        
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
                                    <PetInfoSection
                                        register={register}
                                        errors={errors}
                                    />
                                    
                                    <div className="space-y-6">
                                        <LocationSection
                                            register={register}
                                            errors={errors}
                                            voivodeships={getVoivodeships.data || ["Ładowanie województw..."]}
                                            profileLocation={profileLocation}
                                            setUseProfileLocation={setUseProfileLocation}
                                        />
                                        
                                        <ImagesSection
                                            base64Images={base64Images}
                                            setBase64Images={setBase64Images}
                                            selectedImage={selectedImage}
                                            setSelectedImage={setSelectedImage}
                                            readImageToBase64={readImageToBase64}
                                        />
                                        
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
        </PageLayout>
    );
};

export default AdsAdd;