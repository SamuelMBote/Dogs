import React from 'react';
import {Link} from 'react-router-dom';

import useForm from '../../hooks/useForm';
import {UserContext} from '../../UserContext';
import Button from '../forms/Button';
import Input from '../forms/Input';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const {userLogin} = React.useContext(UserContext);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }
  return (
    <section>
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Entrar</Button>
      </form>
      <Link to={'/login/criar'}>Cadastro</Link>
    </section>
  );
};

export default LoginForm;
