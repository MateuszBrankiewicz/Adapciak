import { UseFormSetError } from 'react-hook-form';
import { loginFormSchema, LoginFormSchema } from '../types/formSchemas';
import '../App.css';
import InputComponent from '../components/InputComponent';
import Form from '../components/Form';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import axios from 'axios';
import { useLoginUser } from '../hooks/authHooks';
const LoginPage = () => {
  const { loginUser } = useLoginUser();
  const onSubmit = async (data: LoginFormSchema, setError: UseFormSetError<LoginFormSchema>) => {
   
      loginUser(data, setError);
   
  };

  return (
    <div className='container flex items-center justify-center flex-col h-3/4 w-2/4 bg-gray-100 rounded-3xl backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-200 shadow-lg text-center'>
    <Form
      schema={loginFormSchema}
      onSubmit={onSubmit}
      tittle='Zaloguj się'
    >
      {({ register, errors }) => (
        <>
          <InputComponent
          register={register}
            type='email'
            label='email'
            placeholder='Wprowadź email'
            {...register('email')}
            error={errors.email}
          />
          <InputComponent
          register={register}
            type='password'
            label='password'
            placeholder='Wprowadź hasło'
            {...register('password')}
            error={errors.password}
          />
         <Button type='submit' style='primary' size='normal' text='Zaloguj się'></Button>
        </>
      )}
    </Form>
     <Link to ="/register"><p>Nie masz konta? Zarejestruj się teraz!</p></Link>
    </div>
  );
};

export default LoginPage;