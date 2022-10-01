import React from 'react';
import successimage from '../images/success.svg';
import errorimage from '../images/error.svg';
import Popup from './Popup';

function InfoTooltip({ isOpen, onClose, status }) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      name='infotooltip'>
        {status === 'success' ? (
          <div className='info__body'>
            <img
              className='info__image'
              src={successimage}
              alt='Check mark inside a circle - success icon' />
            <p className='info__text'>Success! You have now been registered.</p>
          </div>
        ) : (
          <div className='info__body'>
            <img
              className='info__image'
              src={errorimage}
              alt='A red cross inside a red circle - fail icon' />
            <p className='info__text'>Oops, something went wrong! Please try again.</p>
          </div>
        )};
      </Popup>
  );
};

export default InfoTooltip;
