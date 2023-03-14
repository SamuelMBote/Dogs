import React from 'react';
import UserHeaderNav from './UserHeaderNav';
import style from './UserHeader.module.css';
import {useLocation} from 'react-router-dom';
const UserHeader = () => {
  const [title, setTitle] = React.useState<string>('');
  const location = useLocation();
  React.useEffect(() => {
    const {pathname} = location;
    switch (pathname) {
      case '/conta/postar':
        setTitle('Poste Sua Foto');
        break;
      case '/conta/estatisticas':
        setTitle('Estatísticas');
        break;
      default:
        setTitle('Minha Conta');
        break;
    }
  }, [location]);
  return (
    <header className={style.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
