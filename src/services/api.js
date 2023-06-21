import Cookies from 'js-cookie';

const customFetch = (url, options = {}) => {
  const defaultOptions = {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
  };

  return fetch(`http://localhost:8001${url}`, defaultOptions);
};

export const getCsrf = () => {
  fetch('/api/csrf-token');
};

export const signup = async (userData) => {
  const response = await customFetch('/api/users/create', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }

  const resp = await response.json();

  throw resp.error;
};

export const login = async (userInfo) => {
  const response = await customFetch('/api/users/login', {
    method: 'POST',
    body: userInfo,
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }

  throw new Error('Login failed');
};

export const getWorkshops = async () => {
  const response = await customFetch('/api/workshops/');

  if (response.ok) {
    const data = await response.json();
    return data;
  }

  const resp = await response.json();

  throw resp.error;
}