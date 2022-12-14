import React, { useState, useContext } from 'react';
import { Ornaments, InputGroup, ButtonSubmit } from '../components';
import { UserContext } from '../context/UserContext';

const Login = () => {

  const {loginUser} = useContext(UserContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);


  const submitLogin = async (e) => {
    e.preventDefault();
    await loginUser(email, password);
  }

  return (
    <div className='flex items-center justify-center w-full h-screen login-bg relative'>
      <Ornaments />

      <div className='flex flex-col gap-8 xs:w-9/12 sm:w-[28rem] rounded-md bg-gray-100 p-6'>
        <h3 className='text-2xl text-gray-900 text-center font-bold relative z-20'>Se Connecter</h3>
        <form className='flex flex-col gap-8'>
          <InputGroup id='email' type="text" label="Email" handler={setEmail}/>
          <InputGroup id='password' type="password" label="Mot de Passe" handler={setPassword}/>

          <ButtonSubmit text='Login' handler={submitLogin} style='sm:p-3 p-2 rounded-md text-xl
     font-bold bg-green-400 hover:bg-green-500' />
        </form>
      </div>
    </div>
  )
}

export default Login;