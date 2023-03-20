import React from 'react';
import style from './Image.module.css';
const Image = ({src, alt, ...props}: {src: string; alt: string}) => {
  const [skeleton, setSkeleton]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = React.useState<boolean>(true);
  function handleLoad(event: React.SyntheticEvent<HTMLImageElement>) {
    if (event && event.target instanceof HTMLImageElement) {
      setSkeleton(false);
      event.target.style.opacity = '1';
    }
  }
  return (
    <div className={style.wrapper}>
      {skeleton && <div className={style.skeleton}></div>}

      <img
        onLoad={handleLoad}
        className={style.img}
        src={src}
        alt={alt}
        {...props}
      />
    </div>
  );
};

export default Image;
