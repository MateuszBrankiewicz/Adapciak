import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form"; 
import { useEffect, useRef, useState } from "react";

type SelectOption = {
  value: string;
  label: string;
};

type SelectWithSearchProps<T extends FieldValues> = {
    name: Path<T>;
    register: UseFormRegister<T>;
    error?: FieldError;
    label: string;
    data: string[] | SelectOption[];
    onChange?: (value: string) => void;
    value?: string;
    placeholder?: string;
    size?: "small" | "normal";
    disabled?: boolean;
};

const SelectWithSearch = <T extends FieldValues>({
    label,
    data,
    placeholder,
    onChange,
    register,
    error,
    name,
    value,
    size = "normal",
    disabled
}: SelectWithSearchProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState(value || "");
    const [filteredData, setFilteredData] = useState<SelectOption[]>([]);
    const ref = useRef<HTMLDivElement>(null);
    
    // Przetwarzanie danych, aby obsługiwać zarówno tablice stringów jak i obiektów
    const normalizedData = data.map((item): SelectOption => {
        if (typeof item === 'string') {
            return { value: item, label: item };
        }
        return item as SelectOption;
    });
    
    // Synchronizacja z zewnętrzną wartością
    useEffect(() => {
        if (value !== undefined) {
            // Znajdź odpowiednią etykietę jeśli podano wartość
            const option = normalizedData.find(item => item.value === value);
            setSearch(option ? option.label : value);
        }
    }, [value, normalizedData]);

    // Filtrowanie danych na podstawie wyszukiwania
    useEffect(() => {
        setFilteredData(
            normalizedData.filter((item) =>
                item.label.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, normalizedData]);

    // Obsługa kliknięcia poza komponentem
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
                
                // Jeśli użytkownik nie wybrał żadnej opcji, przywracamy poprzednią wartość
                if (!filteredData.some(item => item.label === search)) {
                    const option = normalizedData.find(item => item.value === value);
                    if (option) {
                        setSearch(option.label);
                    } else if (search && filteredData.length === 0) {
                        setSearch('');
                    }
                }
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [filteredData, normalizedData, search, value]);

    // Obsługa wyboru opcji
    const handleSelect = (option: SelectOption) => {
        setSearch(option.label);
        setIsOpen(false);
        
        // Aktualizacja wartości formularza
        if (onChange) {
            onChange(option.value);
        }
    };

    // Pobieranie funkcji z register
    const { onChange: registerOnChange, onBlur, name: registerName, ref: registerRef } = register(name);

    return (
        <div className={`relative ${size === "small" ? "w-full" : "w-full"}`} ref={ref}>
            <label className={`block text-gray-700 font-medium mb-2 ${size === "small" ? "text-sm" : ""}`}>
                {label}
            </label>
            
            <div className="relative">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={search}
                    name={registerName}
                    ref={registerRef}
                    onBlur={onBlur}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        setSearch(newValue);
                        setIsOpen(true);
                        
                        // Wywołanie obu funkcji onChange
                        registerOnChange(e);
                        
                        // Tworzymy ukrytą wartość dla react-hook-form
                        const option = normalizedData.find(item => item.label === newValue);
                        if (option && onChange) {
                            onChange(option.value);
                        } else if (onChange) {
                            onChange(newValue);
                        }
                    }}
                    onClick={() => setIsOpen(true)}
                    className={`
                        w-full px-4 py-3 rounded-md border 
                        ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'} 
                        ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-70' : 'cursor-text'}
                        focus:ring-2 focus:ring-main-color focus:border-main-color
                        transition-colors
                    `}
                    autoComplete="off"
                    disabled={disabled}
                />
                
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="material-icons text-gray-400">
                        {isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                    </span>
                </div>
            </div>
            
            {isOpen && filteredData.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                    {filteredData.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                handleSelect(option);
                                
                                // Tworzenie syntetycznego zdarzenia dla react-hook-form
                                const syntheticEvent = {
                                    target: { name, value: option.value }
                                };
                                registerOnChange(syntheticEvent as any);
                            }}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center"
                        >
                            {/* Dodajemy zaznaczenie dla wybranej opcji */}
                            <span className="flex-grow">{option.label}</span>
                            {option.label === search && (
                                <span className="material-icons text-main-color text-sm">check</span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            
            {isOpen && search && filteredData.length === 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 py-2 px-4 text-gray-500 shadow-lg">
                    Brak wyników dla "{search}"
                </div>
            )}
            
            {error && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                    <span className="material-icons text-sm mr-1">error_outline</span>
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default SelectWithSearch;