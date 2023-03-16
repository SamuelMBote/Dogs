import React from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import {TOKEN_POST, TOKEN_VALIDADE_POST, USER_GET} from './api/Api';
import useFetch from './hooks/useFetch';

export const UserContext = React.createContext<{
  data: {[key: string]: any} | null;
  login: boolean;
  loading: boolean;
  error: string | null;
  userLogin: ((username: string, password: string) => Promise<void>) | null;
  userLogout: (() => Promise<void>) | null;
}>({
  data: null,
  login: false,
  loading: false,
  error: null,
  userLogin: null,
  userLogout: null,
});

export const UserStorage: ({
  children,
}: {
  children: JSX.Element[];
}) => JSX.Element = ({children}) => {
  const [data, setData]: [any, React.Dispatch<React.SetStateAction<any>>] =
    React.useState(null);

  const [login, setLogin]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = React.useState<boolean>(false);

  const [loading, setLoading]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = React.useState<boolean>(false);

  const [error, setError]: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>,
  ] = React.useState<string | null>(null);

  const navigate: NavigateFunction = useNavigate();

  const {request} = useFetch();

  const userLogout: () => Promise<void> = React.useCallback(
    async function (): Promise<void> {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/login');
    },
    [navigate],
  );
  React.useEffect((): void => {
    async function autoLogin(): Promise<void> {
      const token: string | null = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const {url, options} = TOKEN_VALIDADE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token Inválido');
          await getUser(token);
        } catch (error) {
          if (error instanceof Error) setError(error.message);
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);
  async function getUser(token: string): Promise<void> {
    const {url, options} = USER_GET(token);
    const {response, json} = await request(url, options);
    setData(json);
    setLogin(true);
  }

  async function userLogin(username: string, password: string): Promise<void> {
    try {
      setError(null);
      setLoading(true);
      const {url, options} = TOKEN_POST({username, password});
      const {response, json} = await request(url, options);
      if (response && !response.ok) throw new Error(`Erro: Usuário Inválido`);

      const {token} = json;

      window.localStorage.setItem('token', token);

      await getUser(token);

      navigate('/conta');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <UserContext.Provider
        value={{userLogin, userLogout, data, error, loading, login}}
      >
        {children}
      </UserContext.Provider>
    </div>
  );
};
