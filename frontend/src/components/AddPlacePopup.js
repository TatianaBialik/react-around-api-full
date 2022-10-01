import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../utils/useForm';

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit, isSaving }) {
  const {values, handleChange, setValues} = useForm({name: '', link: ''});

  useEffect(() => {
    setValues({name: '', link: ''});
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit(values);
  };

  return (
    <PopupWithForm
      name='add-card'
      title='New place'
      buttonText='Create'
      buttonProcessText='Creating...'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSaving={isSaving}>
      <input
        name='name'
        type='text'
        minLength='1'
        maxLength='30'
        className='form__input form__input_type_title form__input_position_first'
        id='add-form-title-input'
        placeholder='Title'
        value={values.name}
        onChange={handleChange}
        required />
      <span className='form__error add-form-title-input-error' />

      <input
        name='link'
        type='url'
        className='form__input form__input_type_link form__input_position_next'
        id='add-form-link-input'
        placeholder='Image link'
        value={values.link}
        onChange={handleChange}
        required />
      <span className='form__error add-form-link-input-error' />
    </PopupWithForm>
  );
};

export default AddPlacePopup;
