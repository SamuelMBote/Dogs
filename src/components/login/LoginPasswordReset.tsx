import React from 'react';
import {useNavigate} from 'react-router-dom';
import {PASSWORD_RESET} from '../../api/Api';
import useFetch from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import Button from '../forms/Button';
import Input from '../forms/Input';
import Erro from '../helper/Erro';
import Head from '../helper/Head';

const LoginPasswordReset: () => JSX.Element = () => {
  const [login, setLogin]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = React.useState<string>('');

  const [key, setKey]: [string, React.Dispatch<React.SetStateAction<string>>] =
    React.useState<string>('');
  const password = useForm('password');
  const {error, loading, request} = useFetch();
  const navigate = useNavigate();
  React.useEffect(() => {
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    const key = params && params.get('key');
    const login = params && params.get('login');
    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement> | SubmitEvent,
  ) {
    event.preventDefault();
    if (password.validate()) {
      const {url, options} = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });
      const {response} = await request(url, options);
      if (response && response.ok) navigate('/login');
    }
  }
  return (
    <section className="animeLeft">
      <Head title="Resete a Senha" description="" />
      <h1 className="title">Resete a Senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova Senha"
          type="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Resetando</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      <Erro error={error} />
    </section>
  );
};

export default LoginPasswordReset;
