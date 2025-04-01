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
    onSubmit: (data :T, setError: UseFormSetError<T>) => void;
    children: (props: {
        register: UseFormRegister<T>;
        errors: FieldErrors<T>;
        setError: UseFormSetError<T>;
        isSubmitting: boolean;
    }) => React.ReactNode;
    tittle? : string;
};

const Form = <T extends FieldValues>({
    schema,
    onSubmit,
    children,
    tittle
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
        
        <div className='container flex justify-center flex-col h-3/4 w-3/5  bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-50 border border-gray-100 text-center'>
            <h1 className='text-3xl font-bold '>{tittle}</h1>
            <form 
                onSubmit={handleSubmit((data) => onSubmit(data, setError))}
                className='container flex flex-col mt-12 justify-center items-center'
            >
                {children({ register, errors, setError, isSubmitting })}
            </form>
        </div>
    );
};
export default Form;