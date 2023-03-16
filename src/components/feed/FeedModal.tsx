import React from 'react';
import {PHOTO_GET} from '../../api/Api';
import useFetch from '../../hooks/useFetch';
import IPhoto from '../../interfaces/IPhoto';
import Erro from '../helper/Erro';
import Loading from '../helper/Loading';
import PhotoContent from '../photo/PhotoContent';
import style from './FeedModal.module.css';

const FeedModal: ({
  photo,
  setModalPhoto,
}: {
  photo: IPhoto;
  setModalPhoto: React.Dispatch<React.SetStateAction<IPhoto | null>>;
}) => JSX.Element = ({photo, setModalPhoto}) => {
  const {data, error, loading, request} = useFetch();
  React.useEffect((): void => {
    const {url, options} = PHOTO_GET(photo.id);
    request(url, options);
  }, [photo, request]);
  function handleOutsideClick(
    event:
      | React.PointerEvent<HTMLDivElement>
      | React.MouseEvent<HTMLDivElement>,
  ): void {
    if (event.target === event.currentTarget) {
      setModalPhoto(null);
    }
  }
  return (
    <div className={style.modal} onClick={handleOutsideClick}>
      {error && <Erro error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;
