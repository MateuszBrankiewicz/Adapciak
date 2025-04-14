import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

type SelectWithSearchProps<T extends FieldValues> = {
    name: Path<T>;
    register: UseFormRegister<T>;
    error?: FieldError;
    label: string;
    data: string[];
    onChange: (value: string) => void;
    value: string;
    placeholder?: string;
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
}: SelectWithSearchProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState<string[]>(data);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setFilteredData(
            data.filter((item) =>
                item.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, data]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (item: string) => {
        setSearch(item);
        setIsOpen(false);
        onChange(item);
    };

    return (
        <div className="relative w-full" ref={ref}>
            <label className="block text-gray-900 text-xl mb-2">{label}</label>

            <input
                type="text"
                placeholder={placeholder}
                value={search}
                {...register(name)}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setIsOpen(true);
                }}
                onClick={() => setIsOpen(true)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                autoComplete="off"
            />

            {isOpen && filteredData.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-auto">
                    {filteredData.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(item)}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}

            {error && <p className="text-red-600 mt-1">{error.message}</p>}
        </div>
    );
};

export default SelectWithSearch;
