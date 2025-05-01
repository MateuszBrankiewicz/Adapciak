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
    margin?: string;
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
    maxLength,
    margin
}: InputProps<T>) => {
    return (
        <div className="w-full mb-4">
            <label 
                htmlFor={name as string} 
                className="block text-gray-700 font-medium mb-2"
            >
                {label}
            </label>
            <div className="relative">
                <input
                    maxLength={maxLength}
                    {...register(name)}
                    type={type}
                    id={name as string}
                    placeholder={placeholder}
                    autoComplete={autocomplete}
                    disabled={disabled}
                    className={`
                        w-full px-4 py-3 rounded-md border 
                        ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'} 
                        focus:ring-2 focus:ring-main-color focus:border-main-color
                        transition-colors text-gray-900
                        ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
                    `}
                />
                {type === 'password' && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="material-icons text-gray-400 text-sm">lock</span>
                    </div>
                )}
                {type === 'email' && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="material-icons text-gray-400 text-sm">email</span>
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                    <span className="material-icons text-sm mr-1">error_outline</span>
                    {error.message}
                </p>
            )}
        </div>
    );
}

export default InputComponent;
