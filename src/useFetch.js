import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
	const [loading, setLoading] = useState('Loading...');
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		const controller = new AbortController();
		async function fetchData() {
			setData(null);
			setLoading('Loading...');
			setError(null);
			try {
				const response = await axios.get(url, {
					signal: controller.signal,
				});
				response.data && setData(response.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setError('An error occurred...');
				setLoading(false);
			}
		}
		fetchData(url);
		return () => controller.abort();
	}, [url]);

	return { loading, error, data };
};

export default useFetch;
