import React from 'react';
import {USER_POST} from '../../api/Api';
import useForm from '../../hooks/useForm';
import {UserContext} from '../../UserContext';
import Button from '../forms/Button';
import Input from '../forms/Input';

const LoginCreate = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm('password');
  const {userLogin} = React.useContext(UserContext);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const {url, options} = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const response = await fetch(url, options);
    userLogin(username.value, password.value);
    const json = await response.json();
  }
  return (
    <div className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Cadastrar</Button>
      </form>
    </div>
  );
};

export default LoginCreate;
