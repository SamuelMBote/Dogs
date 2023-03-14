import React from 'react';
import style from './Header.module.css';
import {Link} from 'react-router-dom';
import {ReactComponent as Dogs} from '../Assets/dogs.svg';
import {UserContext} from '../UserContext';
const Header = () => {
  const {data} = React.useContext(UserContext);

  return (
    <header className={style.header}>
      <nav className={`${style.nav} container`}>
        <Link className={style.logo} to={'/'} aria-label="Dogs - Home">
          <Dogs />
        </Link>
        {data ? (
          <Link className={style.login} to={'/login'}>
            {data.nome}
          </Link>
        ) : (
          <Link className={style.login} to={'/login'}>
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
