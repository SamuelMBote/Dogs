import React from 'react';
import {STATS_GET} from '../../api/Api';
import useFetch from '../../hooks/useFetch';
import Erro from '../helper/Erro';
import Head from '../helper/Head';
import Loading from '../helper/Loading';
import UserStatsGraphs from './UserStatsGraphs';

const UserStats = () => {
  const {data, loading, error, request} = useFetch();
  React.useEffect(() => {
    async function getData() {
      const {url, options} = STATS_GET();
      const {response, json} = await request(url, options);
    }
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Erro error={error} />;
  if (data)
    return (
      <div>
        <Head title={'Estatísticas'} description={''} />
        <UserStatsGraphs data={data} />
      </div>
    );
  else
    return (
      <div>
        <Head title={'Estatísticas'} description={''} />
      </div>
    );
};

export default UserStats;
