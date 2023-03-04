import React from 'react';

export const TokenPost = () => {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        return json;
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={({target}) => {
          setUsername(target.value);
        }}
      />

      <input
        type="password"
        placeholder="Senha"
        autoComplete="true"
        value={password}
        onChange={({target}) => {
          setPassword(target.value);
        }}
      />
      <button>Enviar</button>
    </form>
  );
};

export default TokenPost;
