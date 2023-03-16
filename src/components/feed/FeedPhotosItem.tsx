import React from 'react';
import IPhoto from '../../interfaces/IPhoto';
import style from './FeedPhotosItem.module.css';
const FeedPhotosItem: ({
  photo,
  setModalPhoto,
}: {
  photo: IPhoto;
  setModalPhoto: React.Dispatch<React.SetStateAction<IPhoto | null>>;
}) => JSX.Element = ({photo, setModalPhoto}) => {
  function handleClick(): void {
    setModalPhoto(photo);
  }
  return (
    <li className={style.photo} onClick={handleClick}>
      <img src={photo.src} alt={photo.title} />
      <span className={style.visualizacao}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
