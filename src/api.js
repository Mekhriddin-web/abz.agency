const API_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

export const getUsers = async (page = 1, count = 6) => {
  const response = await fetch(`${API_URL}/users?page=${page}&count=${count}`);

  return await response.json();
};

export const getPositions = async () => {
  const response = await fetch(`${API_URL}/positions`);

  return await response.json();
};

export const postUser = async data => {
  const tokenResponse = await fetch(`${API_URL}/token`);
  const token = await tokenResponse.json();

  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    body: data,
    headers: { Token: token.token },
  });

  return await response.json();
};
