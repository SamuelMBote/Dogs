import React from 'react';
import {Link} from 'react-router-dom';
import {IComment} from '../../interfaces/IComments';
import IPhoto from '../../interfaces/IPhoto';
import {UserContext} from '../../UserContext';
import Image from '../helper/Image';
import PhotoComments from './PhotoComments';
import style from './PhotoContent.module.css';
import PhotoDelete from './PhotoDelete';
const PhotoContent: ({
  data,
  single,
}: {
  data: {
    photo: IPhoto;
    comments: IComment[];
  };
  single: boolean;
}) => JSX.Element = ({data, single}) => {
  const {photo, comments} = data;
  const user = React.useContext(UserContext);
  return (
    <div className={`${style.photo} ${single ? style.single : ''}`}>
      <div className={style.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={style.details}>
        <div>
          <p className={style.author}>
            {user.data &&
            'username' in user.data &&
            user.data.username === photo.author ? (
              <PhotoDelete id={photo.id} />
            ) : (
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}
            <span className={style.visualizacoes}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={style.attributes}>
            <li>{photo.peso} kg</li>
            <li>
              {photo.idade <= 1 ? `${photo.idade} ano` : `${photo.idade} anos`}
            </li>
          </ul>
        </div>
      </div>
      <PhotoComments single={single} id={photo.id} comments={comments} />
    </div>
  );
};

export default PhotoContent;
