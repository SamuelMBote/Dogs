import React from 'react';
import style from './Footer.module.css';
import {ReactComponent as Dogs} from '../Assets/dogs-footer.svg';
const Footer = () => {
  return (
    <div className={style.footer}>
      <Dogs />
      <p>Dogs. Alguns direitos reservados</p>
    </div>
  );
};

export default Footer;
