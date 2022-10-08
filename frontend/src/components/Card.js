import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button ${!isOwn && 'card__delete-button_disabled'}`
  );
  const isLiked = card.likes.some(user => user === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like ${isLiked && 'card__like_active'}`
  );

  function handleClick() {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  function handleDeleteClick() {
    onCardDelete(card);
  };

  return (
    <li className='card'>
      <button
        className={`action-button ${cardDeleteButtonClassName}`}
        type='button'
        aria-label='Delete card button'
        onClick={handleDeleteClick} />
      <img
        onClick={handleClick}
        src={card.link}
        alt={card.name}
        className='card__picture' />
      <div className='card__caption'>
        <h2 className='card__description'>{card.name}</h2>
        <div className='card__like-wrapper'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            aria-label='Like button'
            onClick={handleLikeClick} />

          <p className='card__like-counter'>{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
};

export default Card;
