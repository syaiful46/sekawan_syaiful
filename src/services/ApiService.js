export const baseUrl = 'https://fakestoreapi.com';

const header = token => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
    'Accept-Language': 'en',
  };
};

export const ApiService = () => {
  const fetchPost = async (url, body, pakeToken, token) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(pakeToken ? {Authorization: 'Bearer ' + token} : {}),
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      return response;
    } catch (error) {
      console.error('Error [POST]-', url, error);
      throw error;
    }
  };

  const fetchGet = async (url, pakeToken, token) => {
    const headers = {
      Accept: 'application/json',
      ...(pakeToken ? {Authorization: 'Bearer ' + token} : {}),
    };
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
        redirect: 'follow',
      });
      return response;
    } catch (error) {
      console.error('Error [GET]-', url, error);
      throw error;
    }
  };

  const fetchDelete = async (url, pakeToken, token) => {
    const headers = {
      Accept: 'application/json',
      ...(pakeToken ? {Authorization: 'Bearer ' + token} : {}),
    };
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers,
      });
      return response;
    } catch (error) {
      console.error('Error [DELETE]-', url, error);
      throw error;
    }
  };

  const fetchPut = async (url, body, token, pakeToken) => {
    const headers = {
      Accept: 'application/json',
      ...(pakeToken ? {Authorization: 'Bearer ' + token} : {}),
    };
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
      });
      return response;
    } catch (error) {
      console.error('Error [PUT]-', url, error);
      throw error;
    }
  };

  const fetchMultipartPost = async (url, formdata, pakeToken, token) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      ...(pakeToken ? {Authorization: 'Bearer ' + token} : {}),
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formdata,
        redirect: 'follow',
      });
      return response;
    } catch (error) {
      console.error('Error [Multipart]-', url, error);
      throw error;
    }
  };

  return {
    fetchPost,
    fetchGet,
    fetchDelete,
    fetchPut,
    fetchMultipartPost,
  };
};
