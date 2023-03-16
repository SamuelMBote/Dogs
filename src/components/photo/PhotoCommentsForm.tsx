import React from 'react';
import {COMMENT_POST} from '../../api/Api';
import {ReactComponent as Enviar} from '../../Assets/enviar.svg';
import useFetch from '../../hooks/useFetch';
import {IComment} from '../../interfaces/IComments';

const PhotoCommentsForm = ({
  id,
  setComments,
}: {
  id: number;
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}) => {
  const [comment, setComment]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = React.useState<string>('');

  const {request, error} = useFetch();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const {url, options} = COMMENT_POST(id, {comment});
      const {response, json} = await request(url, options);
      if (response && response.ok) {
        setComments((comments) => [...comments, json as IComment]);
      }
      if (response && !response.ok) {
        console.log(response);
        throw new Error('Erro ao enviar comentário');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        console.log(error.message);
      }
    }
  }
  return (
    <form action="" onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={({target}: {target: EventTarget & HTMLTextAreaElement}) => {
          if (target && target.value.length) setComment(target.value);
        }}
        name="comment"
        id="comment"
        placeholder="Comente..."
        cols={30}
        rows={10}
      ></textarea>
      <button>
        <Enviar />
      </button>
    </form>
  );
};

export default PhotoCommentsForm;
