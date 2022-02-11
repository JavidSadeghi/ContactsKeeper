import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <div className='wrapper fadeInDown'>
      <div id='formContent'>
          <h1 className='fadeIn first'>
            Account <span className='text-primary'>Login</span>
          </h1>
        <form onSubmit={onSubmit}>
          <input
            type='email'
            name='email'
            id='login'
            className='fadeIn second'
            placeholder='Email Address'
            value={email}
            onChange={onChange}
            required
          />
          <input
            type='password'
            name='password'
            id='password'
            className='fadeIn third'
            placeholder='Password'
            value={password}
            onChange={onChange}
            required
          />
          <input
            type='submit'
            value='Login'
            className='fadeIn fourth'
          />
        </form>

        <div id='formFooter'>
          <Link className='underlineHover' to='/register'>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
