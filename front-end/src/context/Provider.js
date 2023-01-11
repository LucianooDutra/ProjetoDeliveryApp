import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Context from './Context';

function Provider({ children }) {
  const [sellerSelected, setSellerSelected] = useState(undefined);
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [page, setPage] = useState('/');
  const [isDisable, setIsDisable] = useState(true);
  const [errorMessage, setErrorMsg] = useState('');
  const [isHidden, setIsHidden] = useState(true);

  const history = useHistory();

  useEffect(() => {
    // https://stackoverflow.com/posts/9204568/revisions
    const checkEmail = () => email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    const checkPassword = () => {
      const six = 6;
      return password.length >= six;
    };

    const checkName = () => {
      if (page.includes('register')) {
        const twelve = 12;
        return nome.length >= twelve;
      }
      return true;
    };

    const checkForm = () => {
      if (checkName() && checkEmail() && checkPassword()) {
        setIsDisable(false);
      } else setIsDisable(true);
    };
    checkForm();
  }, [nome, email, password, page]);

  /* Sempre que tiver mensagem de erro, o campo fica visível */
  useEffect(() => {
    if (errorMessage !== '') setIsHidden(false);
    else setIsHidden(true);
  }, [errorMessage]);

  const setForm = (name, value) => {
    switch (name) {
    case 'nome':
      setNome(value);
      break;
    case 'email':
      setEmail(value);
      break;
    default:
      setPassword(value);
      break;
    }
  };

  const data = useMemo(
    () => ({
      vars: {
        history,
        nome,
        email,
        password,
        page,
        isDisable,
        errorMessage,
        isHidden,
        address,
        addressNumber,
        sellerSelected,
      },
      funcs: {
        setForm,
        setIsDisable,
        setErrorMsg,
        setPage,
        setAddress,
        setAddressNumber,
        setSellerSelected,
      },
    }),
    [
      history,
      nome,
      email,
      password,
      page,
      isDisable,
      errorMessage,
      isHidden,
      address,
      addressNumber,
      sellerSelected,
    ],
  );

  return (
    <Context.Provider value={ data }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
