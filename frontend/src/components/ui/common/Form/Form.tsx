import {zodResolver} from '@hookform/resolvers/zod'
import {
    FieldErrors,
    FieldValues,
    useForm,
    UseFormRegister,
    UseFormSetError
} from "react-hook-form";
import {ZodSchema} from "zod";

type FormProps<T extends FieldValues> = {
    schema: ZodSchema<T>;
    onSubmit: (data: T, setError: UseFormSetError<T>) => void;
    children: (props: {
        register: UseFormRegister<T>;
        errors: FieldErrors<T>;
        setError: UseFormSetError<T>;
        isSubmitting: boolean;
    }) => React.ReactNode;
    title?: string;
    className?: string;
};

const Form = <T extends FieldValues>({
    schema,
    onSubmit,
    children,
    title,
    className = ''
}: FormProps<T>) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm<T>({
        resolver: zodResolver(schema)
    });
    
    return (
        <div className={`w-full flex justify-center flex-col ${className}`}>
            {title && <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>}
            
            <form 
                onSubmit={handleSubmit((data) => onSubmit(data, setError))}
                className="w-full max-w-md mx-auto flex flex-col gap-4"
            >
                {children({ register, errors, setError, isSubmitting })}
            </form>
        </div>
    );
};

export default Form;