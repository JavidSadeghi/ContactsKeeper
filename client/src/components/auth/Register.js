import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className='wrapper fadeInDown'>
      <div id='formContent'>
        <h1 className='fadeIn first'>
          Account <span className='text-primary'>Register</span>
        </h1>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            name='name'
            value={name}
            className='fadeIn second'
            placeholder='Name'
            onChange={onChange}
            required
          />
          <input
            type='email'
            name='email'
            value={email}
            className='fadeIn second'
            placeholder='Email Address'
            onChange={onChange}
            required
          />
          <input
            type='password'
            name='password'
            value={password}
            className='fadeIn second'
            placeholder='Password'
            onChange={onChange}
            required
            minLength='6'
          />
          <input
            type='password'
            name='password2'
            value={password2}
            className='fadeIn second'
            placeholder='Confirm Password'
            onChange={onChange}
            required
            minLength='6'
          />
          <input type='submit' value='Register' className='fadeIn third' />
        </form>
        <div id='formFooter'>
          <Link className='underlineHover' to='/login'>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
