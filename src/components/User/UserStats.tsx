import React from 'react';
import {STATS_GET} from '../../api/Api';
import useFetch from '../../hooks/useFetch';
import Erro from '../helper/Erro';
import Head from '../helper/Head';
import Loading from '../helper/Loading';

const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'));
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
      <React.Suspense fallback={<Loading />}>
        <Head title={'Estatísticas'} description={''} />
        <UserStatsGraphs data={data} />
      </React.Suspense>
    );
  else
    return (
      <div>
        <Head title={'Estatísticas'} description={''} />
      </div>
    );
};

export default UserStats;
