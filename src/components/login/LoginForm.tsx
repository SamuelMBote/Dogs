import React from 'react';
import {Link} from 'react-router-dom';
import useForm from '../../hooks/useForm';
import Button from '../forms/Button';
import Input from '../forms/Input';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((json) => {
          console.log(json);
          return json;
        });
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
