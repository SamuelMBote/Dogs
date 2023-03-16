import React from 'react';
import IPhoto from '../../interfaces/IPhoto';
import style from './FeedPhotosItem.module.css';
const FeedPhotosItem = ({photo}: {photo: IPhoto}) => {
  return (
    <li className={style.photo}>
      <img src={photo.src} alt={photo.title} />
      <span className={style.visualizacao}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
