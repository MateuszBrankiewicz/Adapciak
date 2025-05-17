import { UseFormSetError } from 'react-hook-form';
import { loginFormSchema, LoginFormSchema } from '../../types/schemas/formSchemas';
import '../../App.css'
import InputComponent from '../../components/ui/common/Input/InputComponent';
import Form from '../../components/ui/common/Form/Form';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/common/Button/Button';
import { useLoginUser } from '../../hooks/api/authHooks';

const LoginPage = () => {
  const { loginUser } = useLoginUser();
  const onSubmit = async (data: LoginFormSchema, setError: UseFormSetError<LoginFormSchema>) => {
    loginUser(data, setError);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      <div className='w-full flex-1 flex flex-col items-center justify-center p-5'>
        <Link to="/" className='mb-10 transition hover:opacity-80'>
          <h1 className='text-4xl font-bold'>Adapciak<span className='text-main-color'>.pl</span></h1>
        </Link>
        
        <div className='w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col lg:flex-row overflow-hidden'>
          {/* Lewa kolumna (Formularz) */}
          <div className='w-full lg:w-3/5 p-8 md:p-10'>
            <div className="mb-8 text-center">
              <h2 className='text-3xl font-bold text-gray-800'>Zaloguj się</h2>
              <p className="text-gray-600 mt-2">Witaj ponownie! Zaloguj się, aby kontynuować.</p>
            </div>
            
            <Form schema={loginFormSchema} onSubmit={onSubmit}>
              {({ register, errors }) => (
                <>
                  <InputComponent
                    register={register}
                    type='email'
                    label='Email'
                    placeholder='Wprowadź adres email'
                    {...register('email')}
                    error={errors.email}
                  />
                  
                  <InputComponent
                    register={register}
                    type='password'
                    label='Hasło'
                    placeholder='Wprowadź hasło'
                    {...register('password')}
                    error={errors.password}
                  />
                  
                  <div className="flex justify-between items-center mb-6 mt-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="remember" className="h-4 w-4 text-main-color border-gray-300 rounded" />
                      <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Zapamiętaj mnie</label>
                    </div>
                    <a href="#" className="text-sm text-main-color hover:underline">Zapomniałeś hasła?</a>
                  </div>
                  
                  <Button type='submit' style='primary' size='normal' text='Zaloguj się' />
                </>
              )}
            </Form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">Nie masz konta? 
                <Link to="/register" className="ml-1 text-main-color font-medium hover:underline">
                  Zarejestruj się
                </Link>
              </p>
            </div>
          </div>

          {/* Prawa kolumna (Obrazek) */}
          <div className="hidden lg:block lg:w-2/5 bg-main-color bg-opacity-10 relative">
            <div className="absolute inset-0 z-0 opacity-30 bg-gradient-to-r from-main-color to-blue-400"></div>
            <div className="h-full flex flex-col items-center justify-center p-10 relative z-10">
              <div className="text-center mb-8">
                <h2 className='text-3xl font-bold text-gray-800'>Witaj w Adapciak</h2>
                <p className="mt-2 text-gray-700">Znajdź swojego idealnego pupila do adopcji!</p>
              </div>
              <img
                className="w-4/5 h-auto rounded-lg shadow-xl object-cover"
                src="/golden.png"
                alt="Pies do adopcji"
              />
              <div className="mt-8 text-center">
                <p className="text-gray-700 italic">"Adoptując zwierzę, zyskujesz przyjaciela na całe życie."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;