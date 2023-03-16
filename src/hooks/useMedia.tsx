import React from 'react';

const useMedia: (media: string) => boolean | null = (media: string) => {
  const [match, setMatch]: [
    boolean | null,
    React.Dispatch<React.SetStateAction<boolean | null>>,
  ] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    function changeMatch(): void {
      const {matches} = window.matchMedia(media);
      setMatch(matches);
    }
    changeMatch();
    window.addEventListener('resize', changeMatch);
    return () => {
      window.removeEventListener('resize', changeMatch);
    };
  }, [media]);
  return match;
};

export default useMedia;
