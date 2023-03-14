import React from 'react';
import {useNavigate} from 'react-router-dom';
import {PHOTO_POST} from '../../api/Api';
import useFetch from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import Button from '../forms/Button';
import Input from '../forms/Input';
import Erro from '../helper/Erro';
import style from './UserPhotoPost.module.css';

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm('number');
  const idade = useForm('number');
  const [img, setImg] = React.useState<{
    raw: File | null;
    preview: string | null;
  }>({raw: null, preview: null});
  const {data, error, loading, request} = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    if (img.raw) formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const token = window.localStorage.getItem('token');

    try {
      if (token) {
        const {url, options} = PHOTO_POST(formData, token);
        request(url, options);
      } else {
        throw new Error('Token Inválido ou Usuário não Logado');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
  function handleImgChange(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    if (event && event.target instanceof HTMLInputElement) {
      if (event.target.files)
        setImg({
          ...img,
          raw: event.target.files[0],
          preview: URL.createObjectURL(event.target.files[0]),
        });
    }
  }

  return (
    <section className={`${style.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="number" name="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" {...idade} />
        <input type="file" name="img" id="img" onChange={handleImgChange} />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Erro error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={style.preview}
            style={{backgroundImage: `url(${img.preview})`}}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
