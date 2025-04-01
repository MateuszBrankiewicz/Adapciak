import Form from "../components/Form";
import InputComponent from "../components/InputComponent";
import NavigationBar from "../components/NavigationBar";
import { adsAddSchema } from "../types/formSchemas";

const AdsAdd = () => {
    return (
        <div className="w-full h-full bg-white text-gray-800">
            <NavigationBar />
            <div className="max-w-4xl mx-auto p-6">
                <Form
                    schema={adsAddSchema}
                    onSubmit={console.log}
                    tittle="Dodaj ogłoszenie"
                >
                    {({ register, errors }) => (
                        <>
                            <h1 className="text-2xl font-bold text-green-600 mb-4">
                                Dodaj ogłoszenie
                            </h1>
                            <InputComponent
                                register={register}
                                type="text"
                                name="title"
                                label="Nazwa ogłoszenia"
                                placeholder="Nazwa ogłoszenia"
                                error={errors.title}
                            />
                            <InputComponent
                                type="text"
                                name="description"
                                label="Opis ogłoszenia"
                                placeholder="Opis ogłoszenia"
                                register={register}
                                error={errors.description}
                            />
                            <InputComponent
                                type="text"
                                name="location"
                                label="Lokalizacja"
                                placeholder="Lokalizacja"
                                register={register}
                                error={errors.location}
                            />
                            <div className="mb-4">
                                <label
                                    htmlFor="pet"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Zwierzę
                                </label>
                                <select
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
                                    name="size"
                                    id="size"
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="small">Mały</option>
                                    <option value="medium">Średni</option>
                                    <option value="large">Duży</option>
                                </select>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
};

export default AdsAdd;