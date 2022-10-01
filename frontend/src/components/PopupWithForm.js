import React from 'react';
import Popup from './Popup';

function PopupWithForm({
          isOpen,
          onClose,
          onSubmit,
          name,
          title,
          children,
          buttonText,
          buttonProcessText,
          isSaving 
        }) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      name={name}>

      <form
        action='#'
        className={`form form_type_${name}`}
        name={name}
        onSubmit={onSubmit}>

        <h2 className='form__title'>{title}</h2>
        {children}
        <button
          type='submit'
          className='form__submit-button'
          disabled={isSaving}>
          {isSaving ? buttonProcessText : buttonText}
        </button>

      </form>
    </Popup>
  );
};

export default PopupWithForm;
