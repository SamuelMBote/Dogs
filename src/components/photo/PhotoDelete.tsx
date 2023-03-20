import React from 'react';
import {PHOTO_DELETE} from '../../api/Api';
import useFetch from '../../hooks/useFetch';
import style from './PhotoDelete.module.css';

const PhotoDelete = ({id}: {id: number}) => {
  const {loading, request} = useFetch();
  async function handleClick() {
    const confirm = window.confirm('Tem certeza que deseja deletar?');
    if (confirm) {
      const {url, options} = PHOTO_DELETE(id);
      const {response, json} = await request(url, options);
      if (response && response.ok) window.location.reload();
    }
  }
  return (
    <div>
      {loading ? (
        <button disabled className={style.delete}>
          Deletar
        </button>
      ) : (
        <button onClick={handleClick} className={style.delete}>
          Deletar
        </button>
      )}
    </div>
  );
};

export default PhotoDelete;
