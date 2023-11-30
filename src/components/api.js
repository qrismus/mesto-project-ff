const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-1',
    headers: {
      authorization: 'bb5a9a37-df9a-479e-956d-fe08736880d2',
      'Content-Type': 'application/json'
    }
};

// получаем информацию о пользователе с сервера
function getUserInfo() {
    return fetch(config.baseUrl + '/users/me', {
        headers: config.headers
    })
    .then((res) => checkResponse(res));
};

// получаем карточки с сервера
function getInitialCards() {
    return fetch(config.baseUrl +'/cards', {
        headers: config.headers
    })
    .then((res) => checkResponse(res));
};

// отредактированные данные отправляем на сервер
function updateUserInfo(profileName, profileJob) {
    return fetch(config.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profileName,
            about: profileJob
        })
    })
    .then((res) => checkResponse(res));
};

// отправляем новую карточку на сервер
function updateNewCard(popupInputCardName, popupInputUrl) {
    return fetch(config.baseUrl + '/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: popupInputCardName,
            link: popupInputUrl
        })
    })
    .then((res) => checkResponse(res));
};

// удаление карточки
function deleteCard(cardId) {
    return fetch(config.baseUrl + `/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => checkResponse(res));
};

// лайк
function likeCard(cardId) {
    return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then((res) => checkResponse(res));
};

// дизлак
function dislikeCard(cardId) {
    return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => checkResponse(res));
};

// обновление аватара
function updateUserAvatar(url) {
    return fetch(config.baseUrl + '/users/me/avatar ', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: url
        })
    })
    .then((res) => checkResponse(res));
};

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
};

export {getUserInfo, getInitialCards, updateUserInfo, updateNewCard, deleteCard, likeCard, dislikeCard, updateUserAvatar};