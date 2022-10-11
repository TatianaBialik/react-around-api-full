import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Register from './Register';
import Login from './Login';

import api from '../utils/api';
import * as auth from '../utils/auth';
import CurrentUserContext from '../contexts/CurrentUserContext';

import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import InfoTooltip from './InfoTooltip';

import ProtectedRoute from './ProtectedRoute';

function App() {
  /* Popups opened/closed state constants */
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [infoToolTipStatus, setInfoToolTipStatus] = useState('');

  /* Cards state constants */
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  /* Current user information state */
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState('');

  /* Saving information state for popups' button text render */
  const [isSaving, setIsSaving] = useState(false);

  /* Logged in state */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [token, setToken] = useState(localStorage.getItem('jwt'));

  /* useHistory */
  const history = useHistory();

  /* Get initial page information: user info and cards gallery */
  useEffect(() => {
    if (token) {
      Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch(err => console.log(err));
    }
  }, [token]);

  /* Checking user token stored in local storage when the resourse is loaded */
  useEffect(() => {
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.email);
            setIsLoggedIn(true);
            history.push('/');
          } else {
            localStorage.removeItem('jwt');
          }
        })
        .catch((err) => console.log(err));
    };
  }, []);

  /* Cards' buttons handlers: like and delete card */
  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked, token)
      .then(newCard => {
        setCards(state =>
          state.map(currentCard =>
            currentCard._id === card._id ? newCard : currentCard))
      })
      .catch(err => console.log(err));
  };

  function handleCardDelete(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectedCard(card);
  };

  /* Forms connected to cards gallery submission handlers: delete card, add card */
  const handleDeleteCardSubmission = () => {
    setIsSaving(true);
    api
      .deleteCard(selectedCard._id, token)
      .then(() => {
        setCards(state =>
          state.filter(currentCard =>
            currentCard._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsSaving(false));
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setIsSaving(true);
    api
      .addCard({ name, link }, token)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsSaving(false));
  };

  /* Sign up and sign in handlers */
  function handleRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        if (res._id) {
          setInfoToolTipStatus('success');
          history.push('/signin');
        } else {
          setInfoToolTipStatus('error');
        };
      })
      .catch(() => {
        setInfoToolTipStatus('error');
      })
      .finally(() => setIsInfoTooltipPopupOpen(true));
  };

  function handleLogin({ email, password }) {
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          setIsLoggedIn(true);
          setEmail(email);
          localStorage.setItem('jwt', res.token);
          setToken(res.token);
          history.push('/');
        } else {
          setInfoToolTipStatus('error');
          setIsInfoTooltipPopupOpen(true);
        };
      })
      .catch((err) => {
        setInfoToolTipStatus('error');
        setIsInfoTooltipPopupOpen(true);
      });
  };

  /* Log out handler */
  function handleLogout() {
    setIsLoggedIn(false);
    setEmail('');
    localStorage.removeItem('jwt');
    setToken('');
    history.push('/signin');
  };

  /* Open/close popups handlers: edit avatar, edit profile, add a card, card popup, close all popups */
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setIsCardPopupOpen(true);
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  };

  /* Update user profile handlers: user about and avatar */
  const handleUpdateUser = ({ name, about }) => {
    setIsSaving(true);
    api
      .editProfileInfo({ name, about }, token)
      .then(newUser => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsSaving(false));
  };

  const handleUpdateAvatar = (({ avatar }) => {
    setIsSaving(true);
    api
      .editProfilePhoto(avatar, token)
      .then(newUser => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsSaving(false));
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onLogout={handleLogout} email={email} />
        <Switch>
          {/* Protected Main route available only for authorized users */}
          <ProtectedRoute exact path='/' loggedIn={isLoggedIn}>
            <Main
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} />

            <Footer />
          </ProtectedRoute>

          {/* SignUp and SignIn unprotected and available for everyone */}
          <Route path='/signup'>
            <Register onRegister={handleRegister} />
          </Route>
          <Route path='/signin'>
            <Login onLogin={handleLogin} />
          </Route>

          {/* All unauthorized users are redirected to sign in page regardless of the requested route */}
          <Route>
            {isLoggedIn ? (
              <Redirect to='/' />
            ) : (
              <Redirect to='/signin' />
            )}
          </Route>
        </Switch>

        <EditProfilePopup
          isOpen={isEditProfileOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isSaving={isSaving} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isSaving={isSaving} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          isSaving={isSaving} />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCardSubmission={handleDeleteCardSubmission}
          isSaving={isSaving} />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          status={infoToolTipStatus} />

        <ImagePopup
          card={selectedCard}
          isOpen={isCardPopupOpen}
          onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
