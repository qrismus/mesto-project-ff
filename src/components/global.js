// профиль
export const profileName = document.querySelector('.profile__title');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileJob = document.querySelector('.profile__description');
export const profileAddButton = document.querySelector('.profile__add-button');

// контейнер карточек
export const cardContainer = document.querySelector('.places__list');

// попап редактирование профиля
export const popupTypeEditProfile = document.querySelector('.popup_type_edit');
export const profileForm = document.forms['edit-profile'];
export const profileNameInput = profileForm.querySelector('.popup__input_type_name');
export const profileJobInput = profileForm.querySelector('.popup__input_type_description');
export const profileImage = document.querySelector('.profile__image');
export const profileSaveButton = profileForm.querySelector('.popup__button')

// попап добавление новой карточки
export const popupTypeNewCard = document.querySelector('.popup_type_new-card');
export const cardForm = document.forms['new-place'];
export const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
export const cardUrlInput = cardForm.querySelector('.popup__input_type_url');
export const cardSaveButton = cardForm.querySelector('.popup__button');

// картинка
export const poputTypeImage = document.querySelector('.popup_type_image');
export const popupImage = poputTypeImage.querySelector('.popup__image');
export const popupCaption = poputTypeImage.querySelector('.popup__caption');

// попал удаления карточки
export const popupTypeDeleteCard = document.querySelector('.popup_type_delete-card');
export const deleteCardForm = document.forms['delete-card'];
export const deleteCardButton = deleteCardForm.querySelector('.popup__button');

//попап редактирования аватара
export const popupTypeAvatar = document.querySelector('.popup_type_avatar');
export const avatarForm = document.forms['edit-avatar'];
export const avatarButtonOpenForm = document.querySelector('.profile__image-button');
export const avatarUrlInput = avatarForm.querySelector('.popup__input_type_url');
export const avatarSaveButton = avatarForm.querySelector('.popup__button');

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};