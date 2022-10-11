import BASE_URL from './constants';
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  };

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  };

  _request(url, options, token) {
    options.headers = this._headers;
    options.headers.authorization = `Bearer ${token}`
    return fetch(this._baseUrl + url, options)
      .then(this._checkResponse);
  };

  getUserInfo(token) {
    return this._request('/users/me', {}, token);
  };

  getInitialCards(token) {
    return this._request('/cards', {}, token);
  };

  addCard({name, link}, token) {
    return this._request('/cards', {
      method: 'POST',
      body: JSON.stringify({
        name,
        link,
      }),
    }, token);
  };

  changeLikeCardStatus(id, isLiked, token) {
    return (isLiked) ? 
      this._request(`/cards/${id}/likes`, {
          method: 'DELETE',
        }, token) :
      this._request(`/cards/${id}/likes`, {
          method: 'PUT',
        }, token);
  };

  deleteCard(id, token) {
    return this._request('/cards/' + id, {
      method: 'DELETE',
    }, token);
  };

  editProfilePhoto(avatar, token) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({
        avatar
      }),
    }, token);
  };

  editProfileInfo({name, about}, token) {
    return this._request('/users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about
      }),
    }, token);
  };
};

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
