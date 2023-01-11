import React, { useContext } from 'react';
import Context from '../context/Context';
import FormButtons from './FormButtons';

function Form() {
  const {
    funcs: { setForm },
  } = useContext(Context);

  const handleChange = ({ target: { name, value } }) => {
    setForm(name, value);
  };

  return (
    <form
      className="
    flex flex-col items-center justify-center gap-4 p-20
    rounded-lg lg: mr-52 md: mr-2 bg-gradient-to-r from-[#87758f] to-[#85aab0]"
    >
      <label htmlFor="nome">
        Nome
        <input
          id="nome"
          type="text"
          name="nome"
          placeholder="Seu nome"
          data-testid="common_register__input-name"
          onChange={ handleChange }
        />
      </label>
      <label
        htmlFor="email"
      >
        Email
        <input
          id="email"
          type="text"
          name="email"
          placeholder="seu-email@site.com.br"
          data-testid="common_register__input-email"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          id="password"
          type="password"
          name="password"
          placeholder="***********"
          data-testid="common_register__input-password"
          onChange={ handleChange }
        />
      </label>
      <FormButtons />
    </form>
  );
}

export default Form;
