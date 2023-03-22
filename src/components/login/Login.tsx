import React from 'react';
import style from './Login.module.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import {UserContext} from '../../UserContext';
import LoginCreate from './LoginCreate';
import LoginForm from './LoginForm';
import LoginPasswordLost from './LoginPasswordLost';
import LoginPasswordReset from './LoginPasswordReset';
import NotFound from '../NotFound';

const Login = (): JSX.Element => {
  const {login} = React.useContext(UserContext);

  if (login === true) return <Navigate to="/conta" />;

  return (
    <section className={style.login}>
      <div className={style.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="criar" element={<LoginCreate />} />
          <Route path="perdeu" element={<LoginPasswordLost />} />
          <Route path="resetar" element={<LoginPasswordReset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
