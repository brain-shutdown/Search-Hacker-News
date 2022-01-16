import React, { useContext, useEffect, useReducer, useState, useCallback } from 'react';

import { SET_LOADING, SET_ERROR, SET_STORIES, REMOVE_STORY, HANDLE_PAGE, HANDLE_SEARCH } from './actions';
import reducer from './reducer';
import useFetch from './useFetch';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';

const initialState = {
	loading: false,
	error: false,
	stories: [],
	query: 'react',
	totalPages: 0,
	currentPage: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [url, setUrl] = useState(`${API_ENDPOINT}query=${state.query}&page=${state.currentPage}`);
	const { data: stories, loading, error } = useFetch(url);

	function handlePage(type) {
		return dispatch({ type: HANDLE_PAGE, payload: type });
	}

	function removeStory(id) {
		return dispatch({ type: REMOVE_STORY, payload: id });
	}

	const handleSearch = useCallback((query) => {
		return dispatch({ type: HANDLE_SEARCH, payload: query });
	}, []);

	useEffect(() => {
		setUrl(`${API_ENDPOINT}query=${state.query}&page=${state.currentPage}`);
	}, [state.query, state.currentPage]);

	useEffect(() => {
		if (loading) {
			return dispatch({ type: SET_LOADING });
		} else if (error) {
			return dispatch({ type: SET_ERROR });
		} else if (stories.hits) {
			return dispatch({ type: SET_STORIES, payload: { stories: stories.hits, totalPages: stories.nbPages } });
		}
	}, [loading, error, stories]);

	return (
		<AppContext.Provider
			value={{
				...state,
				handlePage,
				removeStory,
				handleSearch,
			}}>
			{children}
		</AppContext.Provider>
	);
};
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
