import { useState } from 'react';

const Searchbar = ({formSubmit}) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = e => {
    setQuery( e.currentTarget.value.toLowerCase() );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    formSubmit(query);
    setQuery( '' );
  };

  return (
      <header className="Searchbar">
        <form onSubmit={handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleQueryChange}
          />
        </form>
      </header>
    );
}


export default Searchbar;
