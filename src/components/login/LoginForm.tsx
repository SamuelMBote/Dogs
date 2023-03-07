import React from 'react';
import {Link} from 'react-router-dom';
import {TOKEN_POST, USER_GET} from '../../api/Api';
import useForm from '../../hooks/useForm';
import Button from '../forms/Button';
import Input from '../forms/Input';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      getUser(token);
    }
  });
  async function getUser(token: string) {
    const {url, options} = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      const {url, options} = TOKEN_POST({
        username: username.value,
        password: password.value,
      });

      const response = await fetch(url, options);
      const json = await response.json();

      if (json && typeof json === 'object' && 'token' in json) {
        window.localStorage.setItem('token', json.token);
        getUser(json.token);
      }
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
