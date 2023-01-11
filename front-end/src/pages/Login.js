import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import LoginForm from '../components/LoginForm';
import beerBg from '../images/davide-cantelli-jpkfc5_d-DI-unsplash.jpg';

function Login() {
  const {
    vars: { history, isHidden, errorMessage },
    funcs: { setPage },
  } = useContext(Context);

  useEffect(() => {
    setPage(history.location.pathname);
  });

  return (
  // <div className="relative">
  // className="h-screen flex items-center justify-center relative bg-cover bg-[url('/src/images/missy-fant-OMIgwm1i_NY-unsplash.jpg')] bg-center"

    <section
      style={ { backgroundImage: `url(${beerBg})` } }
      className="h-screen relative bg-cover bg-center"
    >
      <div
        className="h-screen w-screen
      flex items-center
      justify-center absolute bg-black/50 z-10"
      >
        <LoginForm />
        <p data-testid="common_login__element-invalid-email" hidden={ isHidden }>
          {errorMessage}
        </p>
      </div>
    </section>
    // </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Login;
