import React from 'react';

import {PHOTOS_GET} from '../../api/Api';
import useFetch from '../../hooks/useFetch';
import IPhoto from '../../interfaces/IPhoto';
import Erro from '../helper/Erro';
import Loading from '../helper/Loading';
import FeedPhotosItem from './FeedPhotosItem';
import style from './FeedPhotos.module.css';

const FeedPhotos = ({setModalPhoto}: {setModalPhoto: Function}) => {
  const {data, loading, error, request} = useFetch();
  React.useEffect(() => {
    async function fetchPhotos() {
      const {url, options} = PHOTOS_GET({page: 1, total: 6, user: 0});
      const {response, json} = await request(url, options);
    }
    fetchPhotos();
  }, [request]);
  if (error) return <Erro error={error} />;
  if (loading) return <Loading />;
  if (data && data instanceof Array)
    return (
      <ul className={`${style.feed} animeLeft`}>
        {data.map((photo: IPhoto) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
  else return null;
};

export default FeedPhotos;
