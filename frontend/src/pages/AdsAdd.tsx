import Form from "../components/Form";
import InputComponent from "../components/InputComponent";
import NavigationBar from "../components/NavigationBar";
import { AdsAddSchema, adsAddSchema } from "../types/formSchemas";
import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
const AdsAdd = () => {
    const [base64Images, setBase64Images] = useState<string[]>([]);
    const onSubmit = async (data: AdsAddSchema) => {

        const completeData = {
            ...data,
            images : base64Images.map((image) => ({
                url: image,
            })), 
                
        }
        if(completeData.images.length === 0) {
            alert("Dodaj zdjęcie");
            return;
        }
    try {
        const response = await axios.post("http://localhost:3000/ads/create", completeData, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.data);
        alert("Ogłoszenie dodane");
    } catch (error: any) {
        console.error("Error adding ad:", error);
        alert("Nie udało się dodać ogłoszenia");
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
        }
        );
    }

    return (
        <div className="w-full h-full bg-white text-gray-800">
            <NavigationBar />
            <div className="max-w-4xl mx-auto p-6">
                <Form
                    schema={adsAddSchema}
                    onSubmit={onSubmit}

                    tittle="Dodaj ogłoszenie"
                >
                    {({ register, errors }) => (
                        <>

                            <InputComponent
                                register={register}
                                type="text"
                                name="title"
                                label="Nazwa ogłoszenia"
                                placeholder="Nazwa ogłoszenia"
                                error={errors.title}
                            />
                            <div className="text-left mb-4">
                                <label className="text-gray-900 text-xl text-left mb-2" htmlFor="images">Zdjęcia</label>
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
                                                setBase64Images(results);
                                            } catch (err) {
                                                console.error("Error reading image files:", err);
                                            }
                                        }
                                    }}

                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <label className="text-gray-900 text-xl text-left mb-2" htmlFor="description">Opis ogłoszenia</label>

                                <textarea
                                    {...register("description")}
                                    name="description"
                                    id="description"
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Opis ogłoszenia">

                                </textarea>
                            </div>
                            <InputComponent
                                type="text"
                                name="location"
                                label="Lokalizacja"
                                placeholder="Lokalizacja"
                                register={register}
                                error={errors.location}
                            />
                            <div className="flex space-x-2">
                                <div className="mb-4">
                                    <label
                                        htmlFor="pet"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Zwierzę
                                    </label>
                                    <select
                                        {...register("pet")}
                                        name="pet"
                                        id="pet"
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="dog">Pies</option>
                                        <option value="cat">Kot</option>
                                        <option value="other">Inne</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="age"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Wiek
                                    </label>
                                    <select
                                        {...register("age")}
                                        name="age"
                                        id="age"
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="puppy">Szczenie</option>
                                        <option value="adult">Dorosły</option>
                                        <option value="senior">Senior</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="size"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Rozmiar
                                    </label>
                                    <select
                                        {...register("size")}
                                        name="size"
                                        id="size"
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="small">Mały</option>
                                        <option value="medium">Średni</option>
                                        <option value="large">Duży</option>
                                    </select>
                                </div>
                            </div>
                            <Button type="submit" text="Dodaj ogłoszenie" size={"small"}></Button>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
};

export default AdsAdd;