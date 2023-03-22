import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {UserContext} from '../../UserContext';
import Feed from '../feed/Feed';
import Head from '../helper/Head';
import NotFound from '../NotFound';
import UserHeader from './UserHeader';
import UserPhotoPost from './UserPhotoPost';
import UserStats from './UserStats';

const User = () => {
  const {data} = React.useContext(UserContext);
  return (
    <section className="container">
      <Head title={'Minha Conta'} description={''} />
      <UserHeader />
      <Routes>
        <Route
          path="/"
          element={
            <Feed
              user={data && typeof data === 'object' && 'id' in data && data.id}
            />
          }
        />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
