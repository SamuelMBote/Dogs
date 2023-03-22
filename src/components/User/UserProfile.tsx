import React from 'react';
import {useParams} from 'react-router-dom';
import Feed from '../feed/Feed';
import Head from '../helper/Head';

const UserProfile = () => {
  const {user} = useParams();

  return (
    <div className="container mainContainer">
      {user && <Head title={user} description={''} />}
      <h1 className="title">{user}</h1>
      {user && <Feed user={user} />}
    </div>
  );
};

export default UserProfile;
