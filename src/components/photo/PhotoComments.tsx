import React from 'react';
import {IComment, IComments} from '../../interfaces/IComments';
import {UserContext} from '../../UserContext';
import PhotoCommentsForm from './PhotoCommentsForm';
import style from './PhotoComments.module.css';

const PhotoComments = (commentsProps: IComments) => {
  const [comments, setComments]: [
    IComment[],
    React.Dispatch<React.SetStateAction<IComment[]>>,
  ] = React.useState<IComment[]>(() => commentsProps.comments);
  const {login} = React.useContext(UserContext);

  return (
    <>
      <ul className={style.comments}>
        {comments &&
          comments.map((comment) => {
            return (
              <li key={comment.comment_ID}>
                <b>{comment.comment_author}:</b>
                <span>{comment.comment_content}</span>
              </li>
            );
          })}
      </ul>
      {login && (
        <PhotoCommentsForm id={commentsProps.id} setComments={setComments} />
      )}
    </>
  );
};

export default PhotoComments;
