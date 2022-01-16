import React from 'react';
import { useGlobalContext } from './context';

const Buttons = () => {
	const { loading, handlePage, totalPages, currentPage } = useGlobalContext();
	return (
		<div className='btn-container'>
			<button disabled={loading} onClick={() => handlePage('PREV')}>
				prev
			</button>
			<p>
				{currentPage + 1} of {totalPages}
			</p>
			<button disabled={loading} onClick={() => handlePage('NEXT')}>
				next
			</button>
		</div>
	);
};

export default Buttons;
