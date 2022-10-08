class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  };

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  };

  _request(url, options) {
    options.headers = this._headers;
    return fetch(this._baseUrl + url, options)
      .then(this._checkResponse);
  };

  getUserInfo() {
    return this._request('/users/me', {});
  };

  getInitialCards() {
    return this._request('/cards', {});
  };

  addCard({name, link}) {
    return this._request('/cards', {
      method: 'POST',
      body: JSON.stringify({
        name,
        link,
      }),
    });
  };

  changeLikeCardStatus(id, isLiked) {
    return (isLiked) ? 
      this._request(`/cards/${id}/likes`, {
          method: 'DELETE',
        }) :
      this._request(`/cards/${id}/likes`, {
          method: 'PUT',
        });
  };

  deleteCard(id) {
    return this._request('/cards/' + id, {
      method: 'DELETE',
    });
  };

  editProfilePhoto(avatar) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({
        avatar
      }),
    });
  };

  editProfileInfo({name, about}) {
    return this._request('/users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about
      }),
    });
  };
};

const api = new Api({
  baseUrl: 'http://localhost:3001',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});

export default api;
