import { UseFormSetError } from "react-hook-form";
import { registerFormSchema, RegisterFormSchema } from "../types/formSchemas";
import Form from "../components/Form";
import InputComponent from "../components/InputComponent";
import Button from "../components/Button";
import axios from "axios";

const RegisterPage = () => {
    const onSubmit = async (data: RegisterFormSchema, setError: UseFormSetError<RegisterFormSchema>) => {
        const { email, password, confirmPassword, street, province, postalCode, homeNumber, city } = data;
        if (password !== confirmPassword) {
            setError('confirmPassword', {
                message: 'Hasła nie są takie same.'
            });
            return
        }
        try {
            axios.post('http://localhost:3000/register', {
                email,
                password,
                street,
                province,
                postalCode,
                homeNumber,
                city
            }).then((response) => {
                console.log(response);
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setError('email', {
                message: 'Podano nieprawidłowy adres email lub hasło.'
            });
        }
    };

    return (
        <div className='container flex items-center justify-center flex-col h-5/6 w-2/4 py-11 bg-gray-100 rounded-3xl backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-200 shadow-lg text-center'>
            <Form
                schema={registerFormSchema}
                onSubmit={onSubmit}
                tittle="Zarejestruj się">
                {({ register, errors }) => (
                    <>
                        <InputComponent
                            register={register}
                            type='email'
                            label='Email'
                            placeholder='Wprowadź email'
                            name="email"
                            error={errors.email}
                        />
                        <InputComponent
                            register={register}
                            type='password'
                            label='Hasło'
                            placeholder='Wprowadź hasło'
                            name="password"
                            error={errors.password}
                        />
                        <InputComponent
                            register={register}
                            type='password'
                            label='Powtórz hasło'
                            placeholder='Powtórz hasło'
                            error={errors.confirmPassword}
                            name="confirmPassword"
                        />
                        <InputComponent
                        register={register}
                        type='text'
                        label='Numer telefonu'
                        placeholder="Wprowadź numer telefonu"
                        name="phone"
                        error={errors.phone}>
                        </InputComponent>
                        <InputComponent
                            register={register}
                            type='text'
                            label='Ulica'
                            placeholder='Wprowadź ulicę'
                            name="street"
                            error={errors.street}
                        />
                        <InputComponent
                            register={register}
                            type='text'
                            label='Województwo'
                            placeholder='Wprowadź województwo'
                            name="province"
                            error={errors.province}
                        />
                        <InputComponent
                            register={register}
                            type='text'
                            label='Kod Pocztowy'
                            placeholder='Wprowadź kod pocztowy'
                            name="postalCode"
                            error={errors.postalCode}
                        />
                        <InputComponent
                            register={register}
                            type='text'
                            label='Numer domu'
                            placeholder='Wprowadź numer domu'
                            name='homeNumber'
                            error={errors.homeNumber}
                        />
                        <InputComponent
                            register={register}
                            type='text'
                            label='Miasto'
                            placeholder='Wprowadź miasto'
                            name="city"
                            error={errors.city}
                        />
                        <Button type='submit' text='Zarejestruj się' size="normal" style="primary" />
                    </>
                )}
            </Form>
        </div>
    )
}

export default RegisterPage;
