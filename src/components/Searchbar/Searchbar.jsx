import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import style from './Searchbar.module.css';

export function Searchbar({ formSubmit }) {
  const [input, setInput] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();

    if (input.trim()) {
      formSubmit(input);
      setInput('');

      return;
    }

    toast.error(' Enter text to search');
  };

  const handleInputChange = ({ target: { value } }) => {
    setInput(value);
  };

  return (
    <header className={style.searchbar}>
      <form className={style.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={style.searchForm_button}>
          <span className="button-label"></span>
        </button>

        <input
          className={style.searchForm_input}
          type="text"
          autoComplete="off"
          name="findFild"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
          value={input}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  formSubmit: PropTypes.func.isRequired,
};
