import { SET_LOADING, SET_ERROR, SET_STORIES, REMOVE_STORY, HANDLE_PAGE, HANDLE_SEARCH } from './actions';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';

const reducer = (state, action) => {
	switch (action.type) {
		case SET_LOADING:
			return {
				...state,
				loading: true,
				error: false,
				stories: [],
			};

		case SET_ERROR:
			return {
				...state,
				error: true,
				loading: false,
				stories: [],
			};

		case SET_STORIES:
			const { stories, totalPages } = action.payload;
			return {
				...state,
				stories,
				totalPages,
				loading: false,
				error: false,
			};

		case HANDLE_PAGE:
			const type = action.payload;
			if (type === 'NEXT') {
				return { ...state, currentPage: (state.currentPage + 1) % state.totalPages };
			} else if (type === 'PREV') {
				return { ...state, currentPage: (state.currentPage - 1 + state.totalPages) % state.totalPages };
			}
			return { ...state };

		case REMOVE_STORY:
			const newStories = state.stories.filter((story) => story.objectID !== action.payload);
			return {
				...state,
				stories: newStories,
			};

		case HANDLE_SEARCH:
			const query = action.payload;
			return {
				...state,
				currentPage: 0,
				query,
				url: `${API_ENDPOINT}query=${query}&page=${state.currentPage}`,
			};
		default:
			throw new Error('No matching action type!');
	}
};
export default reducer;
