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

  const commentsSection: React.RefObject<HTMLUListElement> =
    React.useRef<HTMLUListElement>(null);

  const {login} = React.useContext(UserContext);

  React.useEffect(() => {
    if (
      commentsSection &&
      commentsSection.current instanceof HTMLUListElement
    ) {
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    }
  }, [comments]);

  return (
    <>
      <ul
        ref={commentsSection}
        className={`${style.comments} ${
          commentsProps.single ? style.single : ''
        }`}
      >
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
        <PhotoCommentsForm
          single={commentsProps.single}
          id={commentsProps.id}
          setComments={setComments}
        />
      )}
    </>
  );
};

export default PhotoComments;
