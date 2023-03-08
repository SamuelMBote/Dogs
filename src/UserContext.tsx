import React from 'react';
import {useNavigate} from 'react-router-dom';
import {TOKEN_POST, TOKEN_VALIDADE_POST, USER_GET} from './api/Api';

export const UserContext = React.createContext<{[key: string]: any}>({
  data: {username: ''},
});
export const UserStorage = ({children}: {children: JSX.Element[]}) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/');
    },
    [navigate],
  );
  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
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
      }
    }
    autoLogin();
  }, [userLogout]);
  async function getUser(token: string) {
    const {url, options} = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(username: string, password: string) {
    try {
      setError(null);
      setLoading(true);
      const {url, options} = TOKEN_POST({username, password});
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Erro: Usuário Inválido`);
      const {token} = await tokenRes.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/');
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
