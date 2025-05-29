import SelectWithSearch2 from "../common/Select/SelectWithSearch2";
import InputComponent2 from "../common/Input/InputComponent2";
import Button from "../common/Button/Button";

interface SearchFiltersProps {
    filters: {
        searchQuery: string;
        pet: string;
        size: string;
        voivodeship: string;
        age: string;
        city: string;
    };
    updateFilter: (name: string, value: string) => void;
    onApplyFilters: () => void;
    isMobile?: boolean;
}

const SearchFilters = ({ updateFilter, onApplyFilters, isMobile = false }: SearchFiltersProps) => {
    const containerClass = isMobile 
        ? "flex flex-col mt-4 bg-white p-6 rounded-lg shadow-md border border-gray-200"
        : "w-full bg-white rounded-lg shadow-md p-8 mb-10 border border-gray-200";

    const filtersGridClass = isMobile 
        ? "space-y-4"
        : "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8";

    const searchSectionClass = isMobile 
        ? "flex flex-col gap-4"
        : "flex flex-col md:flex-row items-end gap-4";

    return (
        <div className={containerClass}>
            {/* Filtry */}
            <div className={filtersGridClass}>
                <div className={isMobile ? "mb-4" : ""}>
                    <SelectWithSearch2
                        name="voivodeship"
                        label="Województwo"
                        data={["Lubelskie", "Mazowieckie", "Śląskie"]}
                        onChange={(value) => updateFilter("voivodeship", value)}
                    />
                </div>
                <div className={isMobile ? "mb-4" : ""}>
                    <InputComponent2 
                        type="text" 
                        label="Miasto" 
                        name="city" 
                        placeholder="np. Warszawa"
                        onChange={(value) => updateFilter("city", value)}
                    />
                </div>
                <div className={isMobile ? "mb-4" : ""}>
                    <SelectWithSearch2 
                        name="pet" 
                        label="Gatunek" 
                        data={["dog","cat"]} 
                        onChange={(value) => updateFilter("pet", value)}
                    />
                </div>
                <div className={isMobile ? "mb-4" : ""}>
                    <SelectWithSearch2 
                        name="size" 
                        label="Rozmiar" 
                        data={["small", "medium","big"]} 
                        onChange={(value) => updateFilter("size", value)}
                    />
                </div>
                <div className={isMobile ? "mb-4" : ""}>
                    <SelectWithSearch2 
                        name="age" 
                        label="Wiek" 
                        data={["puppy","adult","senior"]} 
                        onChange={(value) => updateFilter("age", value)}
                    />
                </div>
            </div>

            {/* Sekcja wyszukiwania i przycisku */}
            <div className={searchSectionClass}>
                <div className="flex-grow w-full md:w-auto">
                    <label htmlFor="search" className="block text-base font-medium text-gray-700 mb-2">
                        Wyszukaj frazę
                    </label>
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Wpisz czego szukasz..."
                        className="p-4 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base bg-white"
                        onChange={(e) => updateFilter("searchQuery", e.target.value)}
                    />
                </div>
                <div className={`flex-shrink-0 w-full md:w-auto ${isMobile ? "" : "mt-2 md:mt-0"}`}>
                    <Button 
                        onClick={onApplyFilters} 
                        type="button" 
                        size="big" 
                        text="Zastosuj filtry" 
                        style="primary" 
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchFilters;
