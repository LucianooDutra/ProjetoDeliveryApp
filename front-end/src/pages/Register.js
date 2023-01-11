import React, { useContext, useEffect } from 'react';
import RegisterForm from '../components/RegisterForm';
import Context from '../context/Context';
import bgImage from '../images/elevate-snnhGYNqm44-unsplash.jpg';

function Register() {
  const {
    vars: { history, isHidden, errorMessage },
    funcs: { setPage },
  } = useContext(Context);

  useEffect(() => {
    setPage(history.location.pathname);
  });

  return (
    <div className="h-screen flex items-center justify-evenly">
      <img src={ bgImage } alt="tap beer" className="w-1/2 rounded-lg" />
      <RegisterForm />
      <p
        data-testid="common_register__element-invalid_register"
        hidden={ isHidden }
      >
        {errorMessage}
      </p>
    </div>
  );
}

export default Register;
