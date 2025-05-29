import Form2 from "../../components/ui/common/Form/Form2";
import {AdsAddSchema, adsAddSchema} from "../../types/schemas/formSchemas";
import {useState, useEffect} from "react";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useAd } from "../../hooks/api/adHooks";
import PageLayout from "../../components/ui/common/Layout/PageLayout";
import SuccessState from "../../components/ui/common/PageState/SuccessState";
import LocationSection from "../../components/ui/common/FormSections/LocationSection";
import ImagesSection from "../../components/ui/common/FormSections/ImagesSection";
import PetInfoSection from "../../components/ui/common/FormSections/PetInfoSection";

const EditAd = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: adData, isLoading: adLoading, isError: adError } = useAd(id ?? "");
    
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

    useEffect(() => {
        if (adData && adData.images) {
            const imageUrls = [...adData.images.map(img => img.url), "", "", "", "", ""].slice(0, 5);
            setBase64Images(imageUrls);
        }
        if (adData) {
            console.log("Ad data loaded:", adData);
        }
    }, [adData]);
    
    const onSubmit = async (data: AdsAddSchema) => {
        console.log(data);

        setIsSubmitting(true);
        setSubmitError("");
        
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
            await axios.put(`http://localhost:3000/ads/${id}`, completeData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setSubmitSuccess(true);
            
            setTimeout(() => {
                navigate("/yourAds");
            }, 2000);
            
        } catch (error: any) {
            console.error("Error updating ad:", error);
            setSubmitError(error.response?.data?.error || "Nie udało się zaktualizować ogłoszenia");
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

    if (adLoading) {
        return (
            <PageLayout
                isLoading={true}
                loadingMessage="Ładowanie danych ogłoszenia..."
                className="w-full min-h-screen flex flex-col bg-gray-50"
            >
                <div />
            </PageLayout>
        );
    }

    if (adError || !adData) {
        return (
            <PageLayout
                isError={true}
                errorTitle="Nie znaleziono ogłoszenia"
                errorDescription="Ogłoszenie nie istnieje lub nie masz uprawnień do jego edycji."
                errorAction={{
                    text: "Powrót do Twoich ogłoszeń",
                    onClick: () => navigate("/yourAds")
                }}
                className="w-full min-h-screen flex flex-col bg-gray-50"
            >
                <div />
            </PageLayout>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-50">
            <PageLayout className="w-full min-h-screen flex flex-col bg-gray-50">
                {submitSuccess ? (
                    <SuccessState
                        title="Ogłoszenie zaktualizowane!"
                        description="Twoje ogłoszenie zostało pomyślnie zaktualizowane."
                        additionalInfo="Za chwilę zostaniesz przekierowany do Twoich ogłoszeń..."
                    />
                ) : (
                    <div className="flex-1 flex flex-col items-center p-4 pb-16">
                        <div className="w-full max-w-6xl">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">Edytuj ogłoszenie</h1>
                                <p className="text-gray-600">Zaktualizuj informacje o swoim ogłoszeniu adopcyjnym</p>
                            </div>
                            
                            {submitError && (
                                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-md">
                                    <div className="flex items-center">
                                        <span className="material-icons text-red-500 mr-3">error_outline</span>
                                        <p className="text-red-700">{submitError}</p>
                                    </div>
                                </div>
                            )}
                            
                            <Form2 
                                formStyle="w-full h-full" 
                                schema={adsAddSchema} 
                                onSubmit={onSubmit}
                                defaultValues={{
                                    title: adData.title || "",
                                    description: adData.description || "",
                                    pet: (adData.pet as "dog" | "cat") || "dog",
                                    age: (adData.age as "puppy" | "adult" | "senior") || "adult",
                                    size: (adData.size as "small" | "medium" | "large") || "medium",
                                    voivodeship: adData.voivodeship || "",
                                    city: adData.city || "",
                                    number: adData.number || "",
                                    note: adData.note || "",
                                }}
                            >
                                {({register, errors}) => (
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <PetInfoSection
                                            register={register}
                                            errors={errors}
                                            defaultValues={{
                                                pet: adData.pet,
                                                age: adData.age,
                                                size: adData.size
                                            }}
                                        />
                                        
                                        <div className="space-y-6">
                                            <LocationSection
                                                register={register}
                                                errors={errors}
                                                voivodeships={getVoivodeships.data || ["Ładowanie województw..."]}
                                                profileLocation={profileLocation}
                                                setUseProfileLocation={setUseProfileLocation}
                                                defaultValues={{
                                                    voivodeship: adData.voivodeship,
                                                    city: adData.city,
                                                    number: adData.number
                                                }}
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
                                                        Aktualizowanie ogłoszenia...
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="material-icons mr-2">save</span>
                                                        Zaktualizuj ogłoszenie
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
        </div>
    );
};

export default EditAd;