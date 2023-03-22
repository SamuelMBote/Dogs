import React from 'react';
import IPhoto from '../../interfaces/IPhoto';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';

const Feed = ({user}: {user: string | null}): JSX.Element => {
  const [modalPhoto, setModalPhoto]: [
    IPhoto | null,
    React.Dispatch<React.SetStateAction<IPhoto | null>>,
  ] = React.useState<IPhoto | null>(null);

  const [pages, setPages]: [
    number[],
    React.Dispatch<React.SetStateAction<number[]>>,
  ] = React.useState<number[]>([1]);

  const [infinite, setInfinite]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = React.useState<boolean>(true);
  console.log('user', user);
  React.useEffect(() => {
    let wait: boolean = false;
    function infiniteScroll() {
      if (infinite) {
        const scroll: number = window.scrollY;
        const height: number = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * 0.75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    }
    window.addEventListener('wheel', infiniteScroll);
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('wheel', infiniteScroll);
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [infinite]);
  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhotos
          key={page}
          user={user ? user : '0'}
          page={page}
          setModalPhoto={setModalPhoto}
          setInfinite={setInfinite}
        />
      ))}
    </div>
  );
};

export default Feed;
