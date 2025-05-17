import '../../../../App.css'
import {
    FieldError,
    FieldValues,
    Path,
    UseFormRegister
} from "react-hook-form";
type InputProps<T extends FieldValues> = {
    type: "text" | "number" | "email" | "password";
    label: string;
    name: Path<T>;
    autocomplete?: HTMLInputElement["autocomplete"];
    placeholder: string;
    disabled?: boolean;
    register?: UseFormRegister<T>;
    error?: FieldError;
    maxLength?: number;
    margin?: string;
    onChange?: (value : string) => void;
};
const InputComponent2 = <T extends FieldValues>({
    type,
    label,
    name,
    placeholder,
    autocomplete,
    disabled,
    register,
    error,
    maxLength,
    margin,
    onChange
}: InputProps<T>) => {
    return (
        <div className='container  '>
            <label htmlFor={name as string} className='text-gray-900 text-xl m-2 mb-2'>
            {label}
            </label>
            <input
            maxLength={maxLength}
            {...(register ? register(name) : {})}
            type={type}
            id={name as string}
            placeholder={placeholder}
            autoComplete={autocomplete}
            disabled={disabled}
            className={`bg-white border-main-color border rounded-md shadow-2xs text-sm  block w-10/11 m-2 p-3 mb-${margin}`}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            />
            {error && <p className='text-red-600'>{error.message}</p>}
        </div>
    );
}
export default InputComponent2;
