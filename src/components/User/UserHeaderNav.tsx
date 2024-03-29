import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {UserContext} from '../../UserContext';
import {ReactComponent as MinhasFotos} from '../../Assets/feed.svg';
import {ReactComponent as Estatisticas} from '../../Assets/estatisticas.svg';
import {ReactComponent as AdicionarFoto} from '../../Assets/adicionar.svg';
import {ReactComponent as Sair} from '../../Assets/sair.svg';
import style from './UserHeaderNav.module.css';
import useMedia from '../../hooks/useMedia';
const UserHeaderNav = () => {
  const mobile = useMedia('(max-width: 40rem)');
  const {userLogout} = React.useContext(UserContext);
  const [mobileMenu, setMobileMenu]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = React.useState<boolean>(false);
  const {pathname} = useLocation();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);
  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${style.mobileButton} ${
            mobileMenu && style.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}
      <nav
        className={`${mobile ? style.navMobile : style.nav}
        ${mobileMenu && style.navMobileActive}`}
      >
        <NavLink to={'/conta'} end>
          <MinhasFotos />
          {mobile && 'Minhas Fotos'}
        </NavLink>
        <NavLink to={'/conta/estatisticas'}>
          <Estatisticas />
          {mobile && 'Estatisticas'}
        </NavLink>
        <NavLink to={'/conta/postar'}>
          <AdicionarFoto />
          {mobile && 'Adicionar Foto'}
        </NavLink>
        <button onClick={() => userLogout && userLogout()}>
          <Sair />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
