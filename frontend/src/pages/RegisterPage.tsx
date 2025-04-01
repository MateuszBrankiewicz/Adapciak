import { UseFormSetError } from "react-hook-form";
import { registerFormSchema, RegisterFormSchema } from "../types/formSchemas";
import Form from "../components/Form";
import InputComponent from "../components/InputComponent";
import Button from "../components/Button";
import axios from "axios";

const RegisterPage = () => {
    const onSubmit = async (data: RegisterFormSchema, setError: UseFormSetError<RegisterFormSchema>) => {
        const { email, password, confirmPassword, street, province, postalCode, homeNumber, city, firstName, lastName } = data;
        if (password !== confirmPassword) {
            setError('confirmPassword', {
                message: 'Hasła nie są takie same.'
            });
            return
        }
        try {
            await axios.post('http://localhost:3000/user/register', {
                email,
                firstName,
                lastName,
                password,
                street,
                province,
                postalCode,
                homeNumber,
                city
            });
               
                alert("Udało się zalogować")
                window.location.href="/login"
            
        } catch (error) {
            console.log("Tu error" + error);
            setError('email', {
                message: 'Istnieje już konto z takim kontem email.'
            });
        }
    };

    return (
        <div className='container flex items-center justify-center flex-col h-5/6 w-2/4 py-14 bg-gray-100 rounded-3xl backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-200 shadow-lg text-center'>
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
                        <div className="flex space-x-2">  
                         <InputComponent
                        register={register}
                        type="text"
                        label="Podaj imie"
                        placeholder="Podaj imie"
                        error={errors.firstName}
                        name="firstName"
                        >
                        </InputComponent>
                        <InputComponent
                        register={register}
                        type="text"
                        label="Podaj nazwisko"
                        placeholder="Podaj nazwisko"
                        error={errors.lastName}
                        name="lastName"
                        ></InputComponent>

                        </div>

                        <InputComponent
                        register={register}
                        type='text'
                        label='Numer telefonu'
                        placeholder="Wprowadź numer telefonu"
                        name="phone"
                        error={errors.phone}>
                        </InputComponent>
                        <div className="flex space-x-2 ">
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
                        </div>
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
