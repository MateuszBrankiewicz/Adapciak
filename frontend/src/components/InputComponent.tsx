import '../App.css';
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
    register: UseFormRegister<T>;
    error?: FieldError;
    maxLength?: number;
};
const InputComponent = <T extends FieldValues>({
    type,
    label,
    name,
    placeholder,
    autocomplete,
    disabled,
    register,
    error,
    maxLength
}: InputProps<T>) => {
    return (
        <div className='container text-left '>
            <label htmlFor={name as string} className='text-gray-900 text-xl text-left mb-2'>
            {label}
            </label>
            <input
            maxLength={maxLength}
            {...register(name)}
            type={type}
            id={name as string}
            placeholder={placeholder}
            autoComplete={autocomplete}
            disabled={disabled}
            className='bg-gray-200 border-secondary-button-border text-secondary-button-text text-sm rounded-lg block w-full p-2.5'

            />
            {error && <p className='text-red-600'>{error.message}</p>}
        </div>
    );
}
export default InputComponent;
