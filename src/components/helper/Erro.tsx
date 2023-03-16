import React from 'react';

const Erro: ({error}: {error: string | null}) => JSX.Element | null = ({
  error,
}) => {
  if (!error) return null;
  return <p style={{color: '#f31', margin: '1rem 0'}}>{error}</p>;
};

export default Erro;
