export const API_URL = 'https://dogsapi.origamid.dev/json';
export function TOKEN_POST(body: {username: string; password: string}): {
  url: string;
  options: {
    method: string;
    headers: {
      'Content-Type': string;
    };
    body: string;
  };
} {
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
export function USER_GET(token: string): {
  url: string;
  options: {
    method: string;
    headers: {
      Authorization: string;
    };
  };
} {
  return {
    url: API_URL + '/api/user',
    options: {
      method: 'GET',
      headers: {Authorization: 'Bearer ' + token},
    },
  };
}
export function TOKEN_VALIDADE_POST(token: string): {
  url: string;
  options: {
    method: string;
    headers: {
      Authorization: string;
    };
  };
} {
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
}): {
  url: string;
  options: {
    method: string;
    headers: {
      'Content-Type': string;
    };
    body: string;
  };
} {
  return {
    url: API_URL + '/api/user',
    options: {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    },
  };
}
export function PHOTO_POST(
  formData: FormData,
  token: string,
): {
  url: string;
  options: {
    method: string;
    headers: {
      Authorization: string;
    };
    body: FormData;
  };
} {
  return {
    url: API_URL + '/api/photo',
    options: {
      method: 'POST',
      headers: {Authorization: 'Bearer ' + token},
      body: formData,
    },
  };
}

export function PHOTOS_GET({
  page,
  total,
  user,
}: {
  page: number;
  total: number;
  user: string;
}): {
  url: string;
  options: {
    method: string;
    cache: string;
  };
} {
  return {
    url: API_URL + `/api/photo/?_page=${page}&_total=${total}&_user=${user}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
}
export function PHOTO_GET(id: number): {
  url: string;
  options: {
    method: string;
    cache: string;
  };
} {
  return {
    url: API_URL + `/api/photo/${id}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
}

export function COMMENT_POST(
  id: number,
  body: {comment: string},
): {
  url: string;
  options: {
    method: string;

    headers: {
      'Content-Type': string;
      Authorization: string;
    };
    body: string;
  };
} {
  return {
    url: API_URL + `/api/comment/${id}`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
      body: JSON.stringify(body),
    },
  };
}

export function PHOTO_DELETE(id: number): {
  url: string;
  options: {
    method: string;

    headers: {
      Authorization: string;
    };
  };
} {
  return {
    url: API_URL + `/api/photo/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    },
  };
}
