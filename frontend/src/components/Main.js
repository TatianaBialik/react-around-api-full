import React, { useContext } from 'react';
import editAvatar from '../images/edit_avatar.svg';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='main'>
      <section className='profile'>
        <div className='profile__user'>
          <div className='profile__avatar-wrapper'>
            <img
              src={currentUser.avatar}
              className='profile__avatar'
              onClick={props.onEditAvatarClick}
              alt='User photo' />
            <img
              src={editAvatar}
              alt='A pencil icon'
              onClick={props.onEditAvatarClick}
              className='profile__edit-avatar-icon' />
          </div>

          <div className='profile__info'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <p className='profile__about'>{currentUser.about}</p>
            <button
              type='button'
              className='action-button profile__edit-button'
              aria-label='Edit profile information button'
              onClick={props.onEditProfileClick} />
          </div>
        </div>
        <button
          type='button'
          className='action-button profile__add-button'
          aria-label='Add a card button'
          onClick={props.onAddPlaceClick} />
      </section>

      <section className='gallery'>
        <ul className='gallery__list'>
          {props.cards.map(card => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
