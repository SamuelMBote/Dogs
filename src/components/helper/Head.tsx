import React from 'react';

const Head: (props: {
  title: string;
  description: string | '';
}) => JSX.Element = (props) => {
  React.useEffect(() => Title, []);
  const Title = React.useCallback(() => {
    document.title = props.title + ' | Dogs';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', props.description);
  }, [props]);
  return <></>;
};

export default Head;
