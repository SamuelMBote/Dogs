import React from 'react';

const UserPost = () => {
  const [username, setUsername] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch('https://dogsapi.origamid.dev/json/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, email, password}),
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
        type="text"
        placeholder="Email"
        value={email}
        onChange={({target}) => {
          setEmail(target.value);
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

export default UserPost;
