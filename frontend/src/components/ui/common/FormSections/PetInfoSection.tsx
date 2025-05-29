import InputComponent2 from "../Input/InputComponent2";
import SelectWithSearch from "../Select/SelectWithSearch";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AdsAddSchema } from "../../../../types/schemas/formSchemas";

interface PetInfoSectionProps {
    register: UseFormRegister<AdsAddSchema>;
    errors: FieldErrors<AdsAddSchema>;
    defaultValues?: {
        pet?: string;
        age?: string;
        size?: string;
    };
}

const PetInfoSection = ({ register, errors, defaultValues }: PetInfoSectionProps) => {
    return (
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
                            data={["dog","cat"]}
                            error={errors.pet}
                            value={defaultValues?.pet}
                        />
                    </div>
                    
                    <div>
                        <SelectWithSearch
                            name="age"
                            label="Wiek"
                            placeholder="Wybierz wiek"
                            register={register}
                            data={["puppy","adult","senior"]}
                            error={errors.age}
                            value={defaultValues?.age}
                        />
                    </div>
                    
                    <div>
                        <SelectWithSearch
                            name="size"
                            label="Rozmiar"
                            placeholder="Wybierz rozmiar"
                            register={register}
                            data={["small","medium","large"]}
                            error={errors.size}
                            value={defaultValues?.size}
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
    );
};

export default PetInfoSection;
