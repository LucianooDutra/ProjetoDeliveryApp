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
      className="absolute bg-white/50 w-96 h-96
     rounded-lg flex flex-col items-center justify-center py-8"
    >

      <div className="flex flex-1 m-auto">
        <label htmlFor="email">
          Login
          <input
            className="flex items-center"
            id="email"
            type="text"
            name="email"
            placeholder="email@tryber.com.br"
            data-testid="common_login__input-email"
            onChange={ handleChange }
          />
        </label>
      </div>
      <div className="flex flex-1 m-auto">
        <label htmlFor="password">
          Senha
          <input
            className="flex items-center"
            id="password"
            type="password"
            name="password"
            placeholder="***********"
            data-testid="common_login__input-password"
            onChange={ handleChange }
          />
        </label>

      </div>
      <FormButtons />
    </form>
  );
}

export default Form;
