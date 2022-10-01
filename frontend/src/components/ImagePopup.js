import React from 'react';
import Popup from './Popup';

function ImagePopup({ isOpen, onClose, card }) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      name='picture'
      boxClasses='popup-picture-box'>
      <img
        src={card.link}
        alt={card.name}
        className='popup-picture-box__image' />
      <p className='popup-picture-box__caption'>{card.name}</p>
    </Popup>
  );
};

export default ImagePopup;
