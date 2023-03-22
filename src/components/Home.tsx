import React from 'react';
import Feed from './feed/Feed';
import Head from './helper/Head';

const Home = () => {
  return (
    <section className="container mainContainer">
      <Head
        title="Fotos"
        description="Home do site dogs, com o feed de fotos"
      />
      <Feed user={null} />
    </section>
  );
};

export default Home;
