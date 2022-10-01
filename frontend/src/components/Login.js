import React from 'react';
import { NavLink } from 'react-router-dom';
import useForm from '../utils/useForm';

function Login({ onLogin }) {
  const {values, handleChange} = useForm({email: '', password: ''});

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  };

  return (
    <div className='auth-page'>
      <h1 className='auth-page__title'>Log in</h1>
      <form
        className='auth-page__form'
        onSubmit={handleSubmit}>
        <fieldset className='auth-page__form-fields'>
          <input
            name='email'
            className='auth-page__email auth-page__input'
            placeholder='Email'
            type='email'
            onChange={handleChange}
            value={values.email} />
          <input
            name='password'
            className='auth-page__password auth-page__input'
            placeholder='Password'
            type='password'
            onChange={handleChange}
            value={values.password} />
        </fieldset>
        <button className='auth-page__submit-button action-button' type='submit'>Log in</button>
      </form>
      <div className='auth-page__subtext'>
        <p className='auth-page__text'>
          Not a member yet?&nbsp;
          <NavLink to='/signup' className='auth-page__redirect-link link'>Sign up here!</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
