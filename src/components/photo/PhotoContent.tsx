import React from 'react';
import {Link} from 'react-router-dom';
import {IComment} from '../../interfaces/IComments';
import IPhoto from '../../interfaces/IPhoto';
import PhotoComments from './PhotoComments';
import style from './PhotoContent.module.css';
const PhotoContent = ({
  data,
}: {
  data: {photo: IPhoto; comments: IComment[]};
}) => {
  const {photo, comments} = data;
  return (
    <div className={style.photo}>
      <div className={style.img}>
        <img src={photo.src} alt={photo.title} />
      </div>
      <div className={style.details}>
        <div>
          <p className={style.author}>
            <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            <span className={style.visualizacoes}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={style.attributes}>
            <li>{photo.peso} kg</li>
            <li>
              {photo.idade <= 1 ? `${photo.idade} ano` : `${photo.idade} anos`}{' '}
              kg
            </li>
          </ul>
        </div>
      </div>
      <PhotoComments id={photo.id} comments={comments} />
    </div>
  );
};

export default PhotoContent;
