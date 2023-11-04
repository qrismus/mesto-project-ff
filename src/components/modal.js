export {openModal, closeModal, closeModalOverlay};

// функция открытия попапа
function openModal(element) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalEsc);
};
    
// функция закрытия попапа
function closeModal(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEsc);
};
    
// функция закрытия попапа через оверлей
function closeModalOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget);
    }
};
    
//функция закрытия попапа через Esc
function closeModalEsc(evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
};