import React from 'react';
import {useParams} from 'react-router-dom';

import Feed from '../feed/Feed';

const UserProfile = () => {
  const {user} = useParams();

  return (
    <div>
      <h1 className="title">{user}</h1>

      {user && <Feed user={user} />}
    </div>
  );
};

export default UserProfile;
