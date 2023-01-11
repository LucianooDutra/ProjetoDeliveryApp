import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import api from '../services/requests';

function FormButtons() {
  const {
    vars: { email, password, nome, history, page, isDisable },
    funcs: { setIsDisable, setErrorMsg },
  } = useContext(Context);

  const loginCLick = async () => {
    await api
      .post('/auth/login', { email, password })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        history.push('/customer/products');
      })
      .catch((err) => {
        if (err.response.data.message) {
          setErrorMsg(err.response.data.message);
        } else {
          setErrorMsg('Problema ao realizar login!');
        }
      });
  };

  const registerClick = async () => {
    await api
      .post('/auth/register', { email, password, name: nome })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        history.push('/customer/products');
      })
      .catch((err) => {
        if (err.response.data.message) {
          setErrorMsg(err.response.data.message);
        } else {
          setErrorMsg('Problema ao realizar cadastro!');
        }
      });
  };

  const goToRegister = () => {
    setIsDisable(true);
    history.push('/register');
  };

  return (
    <section className="flex flex-col items-center">
      {page === '/register' ? (
        <>
          <button
            type="button"
            data-testid="common_register__button-register"
            className="rounded-full bg-lime-700
            hover:bg-lime-900 disabled:opacity-25
            cursor: pointer disabled:cursor: pointer text-neutral-50 py-2 px-6 mt-8"
            disabled={ isDisable }
            onClick={ registerClick }
          >
            Cadastrar
          </button>
          <Link to="/">
            <button
              type="button"
              className="rounded-full
              border-sky-700
              cursor: pointer text-slate-200 py-2 px-6 mt-8 bg-sky-700 hover:text-white"
            >
              Voltar para o Login
            </button>
          </Link>
        </>
      ) : (
        <>
          <button
            type="button"
            data-testid="common_login__button-login"
            className="rounded-full bg-lime-700
            hover:bg-lime-900 disabled:opacity-25
            cursor: pointer disabled:cursor: pointer text-neutral-50
            py-2 px-6 mt-8 w-1/2"
            disabled={ isDisable }
            onClick={ loginCLick }
          >
            LOGIN
          </button>
          <button
            type="button"
            className="rounded-full border-sky-700
            cursor: pointer text-slate-200
            py-2 px-6 mt-8 bg-sky-700 hover:text-white"
            data-testid="common_login__button-register"
            onClick={ goToRegister }
          >
            Ainda não tenho conta
          </button>
        </>
      )}
    </section>
  );
}

export default FormButtons;
