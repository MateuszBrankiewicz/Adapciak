import { UseFormSetError } from "react-hook-form";
import Form from "../../components/ui/common/Form/Form";
import InputComponent from "../../components/ui/common/Input/InputComponent";
import Button from "../../components/ui/common/Button/Button";
import SelectWithSearch from "../../components/ui/common/Select/SelectWithSearch";
import { useVoivodeships } from "../../hooks/formFillersHooks";
import { Link } from "react-router-dom";
import { registerFormSchema, RegisterFormSchema } from "../../types/schemas/formSchemas";
import { useRegisterUser } from "../../hooks/api/authHooks";

const RegisterPage = () => {
    const { registerUser } = useRegisterUser();
    const { data } = useVoivodeships();
    const onSubmit = async (data: RegisterFormSchema, setError: UseFormSetError<RegisterFormSchema>) => {
        registerUser(data, setError);
    };

    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-50">
            <div className='w-full flex-1 flex flex-col items-center justify-center p-5'>
                <Link to="/" className='mb-8 transition hover:opacity-80'>
                    <h1 className='text-4xl font-bold'>Adapciak<span className='text-main-color'>.pl</span></h1>
                </Link>
                
                <div className='w-full max-w-5xl bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col lg:flex-row overflow-hidden'>
                    {/* Lewa kolumna (obrazek) - na dużych ekranach lewa, na małych ukryta */}
                    <div className="hidden lg:block lg:w-2/5 bg-main-color bg-opacity-10 relative">
                        <div className="absolute inset-0 z-0 opacity-30 bg-gradient-to-r from-main-color to-blue-400"></div>
                        <div className="h-full flex flex-col items-center justify-center p-10 relative z-10">
                            <div className="text-center mb-8">
                                <h2 className='text-3xl font-bold text-gray-800'>Dołącz do Adapciak</h2>
                                <p className="mt-2 text-gray-700">Zarejestruj się i zacznij pomagać zwierzętom znaleźć nowy dom!</p>
                            </div>
                            <img
                                className="w-4/5 h-auto rounded-lg shadow-xl object-cover"
                                src="/golden.png"
                                alt="Pies czekający na adopcję"
                            />
                            <div className="mt-8 text-center">
                                <ul className="space-y-2">
                                    <li className="flex items-center text-gray-700">
                                        <span className="material-icons text-main-color mr-2">check_circle</span>
                                        Przeglądaj ogłoszenia adopcyjne
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <span className="material-icons text-main-color mr-2">check_circle</span>
                                        Kontaktuj się z właścicielami
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <span className="material-icons text-main-color mr-2">check_circle</span>
                                        Dodawaj własne ogłoszenia
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    {/* Prawa kolumna (formularz) - na dużych ekranach prawa, na małych pełna szerokość */}
                    <div className='w-full lg:w-3/5 p-8 md:p-10'>
                        <div className="mb-8 text-center">
                            <h2 className='text-3xl font-bold text-gray-800'>Zarejestruj się</h2>
                            <p className="text-gray-600 mt-2">Utwórz konto, aby korzystać ze wszystkich funkcji serwisu</p>
                        </div>
                        
                        <Form schema={registerFormSchema} onSubmit={onSubmit}>
                            {({ register, errors }) => (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputComponent
                                            register={register}
                                            type='text'
                                            label='Imię'
                                            placeholder='Wprowadź imię'
                                            {...register('firstName')}
                                            error={errors.firstName}
                                        />
                                        
                                        <InputComponent
                                            register={register}
                                            type='text'
                                            label='Nazwisko'
                                            placeholder='Wprowadź nazwisko'
                                            {...register('lastName')}
                                            error={errors.lastName}
                                        />
                                    </div>
                                    
                                    <InputComponent
                                        register={register}
                                        type='email'
                                        label='Email'
                                        placeholder='Wprowadź adres email'
                                        {...register('email')}
                                        error={errors.email}
                                    />
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputComponent
                                            register={register}
                                            type='password'
                                            label='Hasło'
                                            placeholder='Wprowadź hasło'
                                            {...register('password')}
                                            error={errors.password}
                                        />
                                        
                                        <InputComponent
                                            register={register}
                                            type='password'
                                            label='Powtórz hasło'
                                            placeholder='Powtórz hasło'
                                            {...register('confirmPassword')}
                                            error={errors.confirmPassword}
                                        />
                                    </div>
                                    
                                    <InputComponent
                                        register={register}
                                        type='text'
                                        label='Telefon'
                                        placeholder='Wprowadź numer telefonu'
                                        {...register('phone')}
                                        error={errors.phone}
                                    />
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="w-full">
                                            <SelectWithSearch
                                                register={register}
                                                name="voivodeship"
                                                label='Województwo'
                                                placeholder='Wybierz województwo'
                                                data={data || ["Błąd wczytywania danych"]}
                                                error={errors.voivodeship}
                                            />
                                        </div>
                                        
                                        <InputComponent
                                            register={register}
                                            type='text'
                                            label='Miasto'
                                            placeholder='Wprowadź miasto'
                                            {...register('city')}
                                            error={errors.city}
                                        />
                                    </div>
                                    
                                    <div className="mt-2 mb-6">
                                        <div className="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                id="terms" 
                                                className="h-4 w-4 text-main-color border-gray-300 rounded"
                                            />
                                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                                Akceptuję <a href="#" className="text-main-color hover:underline">regulamin</a> i <a href="#" className="text-main-color hover:underline">politykę prywatności</a>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <Button type='submit' style='primary' size='normal' text='Zarejestruj się' />
                                </>
                            )}
                        </Form>
                        
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">Masz już konto? 
                                <Link to="/login" className="ml-1 text-main-color font-medium hover:underline">
                                    Zaloguj się
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;