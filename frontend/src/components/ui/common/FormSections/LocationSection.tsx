import InputComponent2 from "../Input/InputComponent2";
import SelectWithSearch from "../Select/SelectWithSearch";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AdsAddSchema } from "../../../../types/schemas/formSchemas";

interface LocationSectionProps {
    register: UseFormRegister<AdsAddSchema>;
    errors: FieldErrors<AdsAddSchema>;
    voivodeships: string[];
    profileLocation: boolean;
    setUseProfileLocation: (value: boolean) => void;
    defaultValues?: {
        voivodeship?: string;
        city?: string;
        number?: string;
    };
}

const LocationSection = ({
    register,
    errors,
    voivodeships,
    profileLocation,
    setUseProfileLocation,
    defaultValues
}: LocationSectionProps) => {
    return (
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
                    data={voivodeships}
                    disabled={profileLocation}
                    error={errors.voivodeship}
                    value={defaultValues?.voivodeship}
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
    );
};

export default LocationSection;
