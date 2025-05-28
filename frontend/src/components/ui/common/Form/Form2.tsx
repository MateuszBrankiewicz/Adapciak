import {zodResolver} from '@hookform/resolvers/zod'
import {
    FieldErrors,
    FieldValues,
    useForm,
    UseFormRegister,
    UseFormSetError,
    DefaultValues
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
    formStyle : string;
    defaultValues?: DefaultValues<T>;
};

const Form2 = <T extends FieldValues>({
    schema,
    onSubmit,
    children,
    tittle,
    formStyle,
    defaultValues
}: FormProps<T>) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        
    } = useForm<T>({
        resolver: zodResolver(schema),
        defaultValues
    });
    return (
        
        <div className='w-full h-full '>
            {/* <h1 className='text-3xl font-bold '>{tittle}</h1> */}
            <form
                className={formStyle}
                onSubmit={handleSubmit((data) => onSubmit(data, setError))}
                
            >
                {children({ register, errors, setError, isSubmitting })}
            </form>
        </div>
    );
};
export default Form2;