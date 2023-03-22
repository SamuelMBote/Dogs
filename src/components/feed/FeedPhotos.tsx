import React from 'react';

import {PHOTOS_GET} from '../../api/Api';
import useFetch from '../../hooks/useFetch';
import IPhoto from '../../interfaces/IPhoto';
import Erro from '../helper/Erro';
import Loading from '../helper/Loading';
import FeedPhotosItem from './FeedPhotosItem';
import style from './FeedPhotos.module.css';

const FeedPhotos: ({
  user,
  page,
  setModalPhoto,
  setInfinite,
}: {
  user: string | number;
  page: number;
  setModalPhoto: React.Dispatch<React.SetStateAction<IPhoto | null>>;
  setInfinite: React.Dispatch<React.SetStateAction<boolean>>;
}) => JSX.Element | null = ({user, page, setModalPhoto, setInfinite}) => {
  const {data, loading, error, request} = useFetch();
  React.useEffect(() => {
    async function fetchPhotos(): Promise<void> {
      const total = 3;
      const {url, options} = PHOTOS_GET({page, total, user});
      const {response, json} = await request(url, options);
      if (
        response &&
        response.ok &&
        json instanceof Array &&
        json.length < total
      ) {
        setInfinite(false);
      }
    }
    fetchPhotos();
  }, [request, user, page, setInfinite]);
  if (error) return <Erro error={error} />;
  if (loading) return <Loading />;
  if (data && data instanceof Array)
    return (
      <ul className={`${style.feed} animeLeft`}>
        {data.map<JSX.Element>(
          (photo: IPhoto): JSX.Element => (
            <FeedPhotosItem
              key={photo.id}
              photo={photo}
              setModalPhoto={setModalPhoto}
            />
          ),
        )}
      </ul>
    );
  else return null;
};

export default FeedPhotos;
