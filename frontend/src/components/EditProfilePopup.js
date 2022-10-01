import React, { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import useForm from '../utils/useForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSaving }) {
  const currentUser = useContext(CurrentUserContext);
  const {values, handleChange, setValues} = useForm({name: currentUser.name, about: currentUser.about});

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  };

  useEffect(() => {
    setValues({name: currentUser.name, about: currentUser.about});
  }, [isOpen]);

  return (
    <PopupWithForm
      name='edit-profile'
      title='Edit profile'
      buttonText='Save'
      buttonProcessText='Saving...'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSaving={isSaving}>

      <input
        name='name'
        type='text'
        minLength='2'
        maxLength='40'
        className='form__input form__input_type_name form__input_position_first'
        id='edit-form-name-input'
        placeholder='Enter your name'
        onChange={handleChange}
        value={values.name || ''}
        required />
      <span className='form__error edit-form-name-input-error' />

      <input
        name='about'
        type='text'
        minLength='2'
        maxLength='200'
        className='form__input form__input_type_info form__input_position_next'
        id='edit-form-info-input'
        placeholder='Enter your info'
        onChange={handleChange}
        value={values.about || ''}
        required />
      <span className='form__error edit-form-info-input-error' />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
