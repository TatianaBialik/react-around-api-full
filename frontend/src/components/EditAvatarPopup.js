import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../utils/useForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSaving }) {
  const {values, handleChange, setValues} = useForm({avatar: ''});

  useEffect(() => {
    setValues({avatar: ''});
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values);
  };

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Change profile picture'
      buttonText='Save'
      buttonProcessText='Saving...'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSaving={isSaving}>

      <input
        name='avatar'
        type='url'
        className='form__input form__input_type_link form__input_position_first'
        id='edit-avatar-form-link-input'
        placeholder='Profile photo link'
        onChange={handleChange}
        value={values.avatar}
        required />
      <span className='form__error edit-avatar-form-link-input-error' />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
