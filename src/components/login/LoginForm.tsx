import React from 'react';
import style from './LoginForm.module.css';
import styleButton from '../forms/Button.module.css';
import {Link} from 'react-router-dom';
import useForm from '../../hooks/useForm';
import {UserContext} from '../../UserContext';
import Button from '../forms/Button';
import Input from '../forms/Input';
import Error from '../helper/Error';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const {userLogin, error, loading} = React.useContext(UserContext);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      userLogin && userLogin(username.value, password.value);
    }
  }
  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={style.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error} />
      </form>
      <Link className={style.perdeu} to={'/login/perdeu'}>
        Perdeu a Senha?
      </Link>
      <div className={style.cadastro}>
        <h2 className={style.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site</p>
        <Link className={styleButton.button} to={'/login/criar'}>
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
