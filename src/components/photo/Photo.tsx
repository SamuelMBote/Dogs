import React from 'react';
import {useParams} from 'react-router-dom';
import {PHOTO_GET} from '../../api/Api';
import useFetch from '../../hooks/useFetch';
import Erro from '../helper/Erro';
import Loading from '../helper/Loading';
import PhotoContent from './PhotoContent';

const Photo = () => {
  const {id} = useParams();
  const {data, loading, error, request} = useFetch();
  React.useEffect(() => {
    const {url, options} = PHOTO_GET(Number(id));
    request(url, options);
  }, [request, id]);
  if (error) return <Erro error={error} />;
  if (loading) return <Loading />;
  if (data) {
    return (
      <section className={'container mainContainer'}>
        <PhotoContent data={data} single={true} />
      </section>
    );
  } else {
    return <div>Nenhuma foto selecionada</div>;
  }
};

export default Photo;
