import React from 'react';
import style from './UserStatsGraphs.module.css';
import {VictoryPie, VictoryChart, VictoryBar} from 'victory';
const UserStatsGraphs = ({data}: {data: any}) => {
  const [graph, setGraph]: [
    {x: string; y: number}[],
    React.Dispatch<React.SetStateAction<{x: string; y: number}[]>>,
  ] = React.useState<{x: string; y: number}[]>([]);

  const [total, setTotal]: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ] = React.useState<number>(0);

  React.useEffect(() => {
    if (data && typeof data === 'object' && data instanceof Array) {
      const graphData = data.map((item) => {
        return {x: item.title, y: Number(item.acessos)};
      });
      setGraph(graphData);
      const totalAcessos = data
        .map((item) => {
          return Number(item.acessos);
        })
        .reduce((a, b) => {
          return a + b;
        }, 0);

      setTotal(totalAcessos);
    }
  }, [data]);

  return (
    <section className={`${style.graph} animeLeft`}>
      <div className={`${style.total} ${style.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={`${style.graphItem}`}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{top: 20, bottom: 20, left: 80, right: 80}}
          style={{
            data: {fillOpacity: 0.9, stroke: '#fff', strokeWidth: 2},
            labels: {fontSize: 14, fill: '#333'},
          }}
        />
      </div>
      <div className={` ${style.graphItem}`}>
        <VictoryChart>
          <VictoryBar data={graph} alignment="start" />
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserStatsGraphs;
