import React from 'react';
import {PASSWORD_LOST} from '../../api/Api';
import useFetch from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import Button from '../forms/Button';
import Input from '../forms/Input';
import Erro from '../helper/Erro';
import Head from '../helper/Head';

const LoginPasswordLost = () => {
  const login = useForm('email');
  const {data, loading, error, request} = useFetch();

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement> | SubmitEvent,
  ) {
    event.preventDefault();
    if (login.validate()) {
      const {url, options} = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace('perdeu', 'resetar'),
      });
      await request(url, options);
    }
  }
  return (
    <section>
      <Head title="Perdeu a Senha" description="" />
      <h1 className="title">Perdeu a senha?</h1>
      {data ? (
        <p style={{color: '#4c1'}}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email / Usuário" type="text" name="login" {...login} />
          {loading ? (
            <Button disabled>Enviando</Button>
          ) : (
            <Button>Enviar Email</Button>
          )}
        </form>
      )}
      <Erro error={error} />
    </section>
  );
};

export default LoginPasswordLost;
