import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ isOpen, onClose, onDeleteCardSubmission, isSaving }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCardSubmission();
  };

  return (
    <PopupWithForm
      name='delete-card'
      title='Are you sure?'
      buttonText='Yes'
      buttonProcessText='Deleting...'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSaving={isSaving} />
  );
};

export default DeleteCardPopup;
