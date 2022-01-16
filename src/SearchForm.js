import React, { useRef, useEffect, useState } from 'react';
import { useGlobalContext } from './context';

const SearchForm = () => {
	const { query, handleSearch } = useGlobalContext();
	const [newQuery, setNewQuery] = useState(query);
	const debouncedQuery = useDebounce(newQuery, 400);
	const searchValue = useRef(query);

	useEffect(() => {
		searchValue.current.focus();
	}, []);

	useEffect(() => {
		handleSearch(debouncedQuery);
	}, [debouncedQuery, handleSearch]);

	return (
		<form action='submit' onSubmit={(e) => e.preventDefault()} className='search-form'>
			<h2>Search Hacker News</h2>
			<input type='text' className='form-input' ref={searchValue} defaultValue={query} onChange={() => setNewQuery(searchValue.current.value)} />
		</form>
	);
};

function useDebounce(value, wait) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const id = setTimeout(() => setDebouncedValue(value), wait);
		return () => clearTimeout(id);
	}, [value, wait]);

	return debouncedValue;
}

export default SearchForm;
