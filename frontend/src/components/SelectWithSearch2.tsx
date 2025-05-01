import { FieldError, FieldValues, Path, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

type SelectWithSearchProps<T extends FieldValues> = {
    name: Path<T>;
    register?: UseFormRegister<T>; // Keep it optional
    error?: FieldError;
    label: string;
    data: string[];
    onChange?: (value: string) => void; // For external state management if needed
    value?: string; // Controlled component value
    placeholder?: string;
    size?: "small" | "normal";
    disabled?: boolean;
};

const SelectWithSearch2 = <T extends FieldValues>({
    label,
    data,
    placeholder,
    onChange: externalOnChange, // Rename to avoid conflict
    register,
    error,
    name,
    value,
    size = "normal",
    disabled
}: SelectWithSearchProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    // Initialize search state preferentially with value, then fallback to empty string
    const [search, setSearch] = useState(value ?? "");
    const [filteredData, setFilteredData] = useState<string[]>(data);
    const ref = useRef<HTMLDivElement>(null);

    // --- React Hook Form Integration ---
    // Store the result of register(name) conditionally
    const registrationProps: UseFormRegisterReturn<Path<T>> | null = register ? register(name) : null;
    const { onChange: registerOnChange, onBlur: registerOnBlur, ref: registerRef, name: registerName } = registrationProps || {};
    // Use component's name prop as fallback if register is not provided
    const inputName = registerName ?? name;
    // --- End RHF Integration ---


    // Effect to synchronize the internal search state with the external value prop
    useEffect(() => {
        // Only update internal state if external value is defined and different
        if (value !== undefined && value !== search) {
            setSearch(value);
        }
        // If value becomes undefined, reset search (optional, depends on desired behavior)
        // else if (value === undefined) {
        //  setSearch("");
        // }
    }, [value, search]); // Added search to dependency to avoid potential loops if value changes rapidly

    // Effect to filter data based on search term
    useEffect(() => {
        setFilteredData(
            data.filter((item) =>
                item.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, data]);

    // Effect for handling clicks outside the component
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

    // Handler when an item is selected from the dropdown
    const handleSelect = (item: string) => {
        setSearch(item);
        setIsOpen(false);

        // Trigger external onChange if provided
        if (externalOnChange) {
            externalOnChange(item);
        }

        // Manually trigger react-hook-form's onChange if register was provided
        if (registerOnChange) {
            // Create a synthetic event that mimics a real input change event
            const syntheticEvent = {
                target: { name: inputName, value: item },
                // You might need to add other properties depending on what RHF expects
                // or if you have specific validation triggers
            };
            registerOnChange(syntheticEvent as any); // Use 'as any' for simplicity, or create a more typed event
        }
    };

    // Handler for input field changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearch(newValue);
        setIsOpen(true); // Open dropdown when typing

        // Trigger external onChange if provided
        if (externalOnChange) {
            externalOnChange(newValue);
        }

        // Trigger react-hook-form's onChange if register was provided
        if (registerOnChange) {
            registerOnChange(e); // Pass the original event
        }
    };

    // Handler for input field blur
    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        // Trigger react-hook-form's onBlur if register was provided
        if (registerOnBlur) {
            registerOnBlur(e); // Pass the original event
        }
        // Optionally close the dropdown on blur after a small delay
        // setTimeout(() => setIsOpen(false), 150); // Delay allows click on list item
    }

    return (
        <div className={size === "small" ? "relative w-1/5" : "relative w-full"} ref={ref}>
            <label htmlFor={inputName} className={size === "small" ? "block text-gray-900 text-sm mb-2" : "block text-left text-gray-900 text-xl mb-2"}>
                {label}
            </label>

            <input
                id={inputName} // Good practice for accessibility
                type="text"
                placeholder={placeholder}
                value={search}
                // --- Pass RHF props conditionally ---
                name={inputName} // Always provide a name
                ref={registerRef} // Pass RHF ref if available
                onBlur={handleInputBlur} // Use combined blur handler
                onChange={handleInputChange} // Use combined change handler
                // --- End RHF props ---
                onClick={() => !disabled && setIsOpen(true)} // Prevent opening if disabled
                className={`bg-white border-main-color border rounded-md shadow-2xs text-sm  block w-10/11 m-2 p-3 "
                } ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${error ? 'border-red-500' : 'border-gray-300'}`}
                autoComplete="off"
                disabled={disabled}
                aria-invalid={error ? "true" : "false"} // Accessibility
                aria-describedby={error ? `${inputName}-error` : undefined} // Accessibility
            />

            {isOpen && !disabled && filteredData.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-auto shadow-lg">
                    {filteredData.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(item)}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-left" // Added text-left
                            role="option" // Accessibility
                            aria-selected={item === search} // Accessibility
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}

            {error && (
                <p id={`${inputName}-error`} className="text-red-600 mt-1 text-sm"> {/* Added text-sm */}
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default SelectWithSearch2;