import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, likeCard} from './components/card.js';
import { closeModal, openModal, closeModalOverlay } from './components/modal.js';


// профиль
const profileTitle = document.querySelector('.profile__title');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileDesc = document.querySelector('.profile__description');
const profileAddButton = document.querySelector('.profile__add-button');

// контейнер карточек
const cardContainer = document.querySelector('.places__list');

// попап редактирование профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

// попап добавление новой карточки
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const formNewPlace = document.forms['new-place'];
const popupInputCardName = document.querySelector('.popup__input_type_card-name');
const popupInputUrl = document.querySelector('.popup__input_type_url');

// картинка
const poputTypeImage = document.querySelector('.popup_type_image');
const popupImage = poputTypeImage.querySelector('.popup__image');
const popupCaption = poputTypeImage.querySelector('.popup__caption');

// добавление в контейнер карточки, проверка карточки на ее местоположение
function renderCard(cardItem, container, place = 'end') {
    if (place === 'end') {
        container.append(createCard(cardItem, deleteCard, likeCard, handleOpenImage));
    } else {
        container.prepend(createCard(cardItem, deleteCard, likeCard, handleOpenImage));
    }
};

// вывод карточек на страницу
initialCards.forEach(function(element) {
    renderCard(element, cardContainer);
});

// открытие попапа профиля с именем и описанием
profileEditButton.addEventListener('click', function () {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDesc.textContent;
    openModal(popupTypeEdit);
});

// открытие попапа "добавить карточку"
profileAddButton.addEventListener('click', function () {
    openModal(popupTypeNewCard);
});

// открытие картинки 
function handleOpenImage(evt){
    popupImage.src = evt.target.src;
    popupImage.alt = popupCaption.textContent = evt.target.alt;
    openModal(poputTypeImage);
  
};

// закрытие попапов
document.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')) {
        closeModal(evt.target.closest('.popup'))
    }
});

// закрытие через оверлей
popupTypeEdit.addEventListener('click', closeModalOverlay);

popupTypeNewCard.addEventListener('click', function (evt) {
    closeModalOverlay(evt);
});

poputTypeImage.addEventListener('click', function(evt) {
    closeModalOverlay(evt);
});

// функция редактирования профиля с сохранением данных и закрытием попапа
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;
    closeModal(popupTypeEdit);
};
formElement.addEventListener('submit', handleProfileFormSubmit);

// добавление новой карточки 
function handleCardFormSubmit (evt) {
    evt.preventDefault();
    const newCard = {
        name: popupInputCardName.value,
        link: popupInputUrl.value,
    };
    renderCard(newCard, cardContainer, 'start');
    closeModal(popupTypeNewCard);
    formNewPlace.reset();
};
formNewPlace.addEventListener('submit', handleCardFormSubmit);