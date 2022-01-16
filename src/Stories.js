import React from 'react';

import { useGlobalContext } from './context';

const Stories = () => {
	const { stories, loading, error, removeStory } = useGlobalContext();
	if (loading) return <div className='loading'></div>;
	if (error) return <h2 className='error'>{error}</h2>;

	return (
		<section className='stories'>
			{stories.map((story) => {
				const { objectID, points, url, author, title, num_comments } = story;
				return (
					<article className='story' key={objectID}>
						<h4 className='title'>{title}</h4>
						<p className='info'>
							{points} points by <span>{author} | </span>
							{num_comments} comments
						</p>
						<div>
							<a href={url} className='read-link' target='_blank' rel='noopener noreferrer'>
								Read More
							</a>
							<button className='remove-btn' onClick={() => removeStory(objectID)}>
								Remove
							</button>
						</div>
					</article>
				);
			})}
		</section>
	);
};

export default Stories;
