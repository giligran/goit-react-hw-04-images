import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchFormButton,
  ButtonLabel,
  Form,
  SearchBar,
  SearchFormInput,
} from './ImageFinder.styled';
import { BiSearchAlt } from 'react-icons/bi';

function Searchbar({ onSubmit }) {
  const [queryValue, setQueryValue] = useState('');

  const handleChange = event => {
    const { value } = event.target;
    setQueryValue(value.trim());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (queryValue.trim() === '') {
      return;
    }
    onSubmit({ queryValue });
    reset();
  };

  const reset = () => {
    setQueryValue('');
  };

  return (
    <SearchBar>
      <Form onSubmit={handleSubmit}>
        <SearchFormButton aria-label="search" type="submit">
          <BiSearchAlt />
          <ButtonLabel>Search</ButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          onChange={handleChange}
          value={queryValue}
          name="queryValue"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </SearchBar>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
