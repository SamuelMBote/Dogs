import React from 'react';
import IPhoto from '../../interfaces/IPhoto';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';

const Feed = (): JSX.Element => {
  const [modalPhoto, setModalPhoto]: [
    IPhoto | null,
    React.Dispatch<React.SetStateAction<IPhoto | null>>,
  ] = React.useState<IPhoto | null>(null);
  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}

      <FeedPhotos setModalPhoto={setModalPhoto} />
    </div>
  );
};

export default Feed;
