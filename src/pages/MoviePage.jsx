import React, { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import Button from '../components/button/Button';
import MovieCard, { SkeletonMovieCard } from '../components/movie/MovieCard';
import { fetcher } from '../config';
import useDebounce from '../hooks/useDebounce';
const itemPerPage = 20;
const pageOne = 1;
const MoviePage = () => {
	const [filter, setFilter] = useState('');
	const [url, setUrl] = useState(
		`https://api.themoviedb.org/3/movie/popular?api_key=${
			import.meta.env.VITE_API_KEY
		}&page=${pageOne}`
	);
	const { data, error, size, setSize } = useSWRInfinite(
		(index) => url.replace('page=1', `page=${index + 1}`),
		fetcher
	);
	const filterDebounce = useDebounce(filter, 500);
	useEffect(() => {
		if (filterDebounce) {
			setUrl(
				`https://api.themoviedb.org/3/search/movie?api_key=${
					import.meta.env.VITE_API_KEY
				}&query=${filterDebounce}`
			);
		} else {
			setUrl(
				`https://api.themoviedb.org/3/movie/popular?api_key=${
					import.meta.env.VITE_API_KEY
				}&page=${pageOne}`
			);
		}
	}, [filterDebounce]);

	const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
	const isEmpty = movies.length === 0;
	const isReachingEnd = isEmpty || (data && data[data.length - 1]?.results.length < itemPerPage);
	const handleFilterChange = (e) => {
		setFilter(e.target.value);
	};
	const loading = !data || error || movies.length <= 0;
	return (
		<div className="py-10 page-container-fluid">
			<div className="flex mb-5 overflow-hidden rounded-lg">
				<div className="flex-1">
					<input
						type="text"
						name="search-movie"
						placeholder="Search movie"
						className="w-full h-full px-3 py-5 text-white outline-none bg-slate-800"
						onChange={handleFilterChange}
					/>
				</div>
				<button className="flex items-center justify-center p-4 bg-primary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6 text-white"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>
			{loading ? (
				<div className="grid grid-cols-4 gap-10">
					{new Array(itemPerPage).fill(0).map((item, index) => (
						<SkeletonMovieCard key={index}></SkeletonMovieCard>
					))}
				</div>
			) : (
				<>
					<div className="grid grid-cols-4 gap-10">
						{movies.length > 0 &&
							movies.map((movie) => <MovieCard key={movie.id} item={movie}></MovieCard>)}
					</div>
					<div className="mt-10 text-center">
						<Button
							onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
							disabled={isReachingEnd}
							className={`${isReachingEnd ? 'bg-slate-300' : ''}`}
						>
							Load more
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default MoviePage;
