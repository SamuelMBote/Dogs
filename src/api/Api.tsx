export const API_URL = 'https://dogsapi.origamid.dev/json';
export function TOKEN_POST(body: {username: string; password: string}) {
  return {
    url: API_URL + '/jwt-auth/v1/token',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}
export function USER_GET(token: string) {
  return {
    url: API_URL + '/api/user',
    options: {
      method: 'GET',
      headers: {Authorization: 'Bearer ' + token},
    },
  };
}
export function TOKEN_VALIDADE_POST(token: string) {
  return {
    url: API_URL + '/jwt-auth/v1/token/validate',
    options: {
      method: 'POST',
      headers: {Authorization: 'Bearer ' + token},
    },
  };
}
export function USER_POST(body: {
  username: string;
  password: string;
  email: string;
}) {
  return {
    url: API_URL + '/api/user',
    options: {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    },
  };
}
export function PHOTO_POST(formData: FormData, token: string) {
  return {
    url: API_URL + '/api/photo',
    options: {
      method: 'POST',
      headers: {Authorization: 'Bearer ' + token},
      body: formData,
    },
  };
}
