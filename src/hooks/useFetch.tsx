import React from 'react';

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const request = React.useCallback(
    async (url: string, options: {[key: string]: any}) => {
      let response;
      let json;
      try {
        setError(null);
        setLoading(true);
        response = await fetch(url, options);
        json = await response.json();
        if (response.ok === false) {
          if ('message' in json) {
            throw new Error(json.message);
          } else {
            throw new Error('Erro ao fazer fetch');
          }
        }
      } catch (error) {
        json = null;
        if (error instanceof Error) setError(error.message);
      } finally {
        setData(json);
        setLoading(false);
        return {response, json};
      }
    },
    [],
  );
  return {data, loading, error, request};
};

export default useFetch;
