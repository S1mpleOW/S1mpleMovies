import React from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from '../loading/Skeleton';

const MovieCard = ({ item }) => {
	const { title, vote_average, poster_path, release_date, id } = item;
	const navigate = useNavigate();
	let url = `/movies/${id}`;

	return (
		<div className="flex flex-col h-full p-3 rounded-lg movie-card bg-slate-800">
			<img
				src={`${poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : ''}`}
				className="w-full h-[250px] object-cover rounded-lg mb-5"
				alt=""
			/>
			<div className="flex flex-col flex-1">
				<h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
				<div className="flex items-center justify-between mt-auto mb-10 text-sm text-white opacity-50">
					<span>{new Date(release_date).getFullYear()}</span>
					<span>{`${vote_average}`}</span>
				</div>
				<button
					onClick={
						url
							? () => {
									navigate(url);
							  }
							: null
					}
					className="w-full px-6 py-3 text-white capitalize transition-colors duration-200 rounded-lg bg-primary hover:bg-opacity-80 "
				>
					Watch now
				</button>
			</div>
		</div>
	);
};

export default MovieCard;

export const SkeletonMovieCard = () => {
	return (
		<div className="flex flex-col h-full p-3 rounded-lg movie-card bg-slate-700">
			<Skeleton className="mb-5" width="100%" height="250px" radius="10px"></Skeleton>
			<div className="flex flex-col flex-1">
				<h3 className="mb-3 text-xl font-bold text-white">
					<Skeleton width="100%" height="20px"></Skeleton>
				</h3>
				<div className="flex items-center justify-between mt-auto mb-10 text-sm text-white opacity-50 gap-x-3">
					<span className="w-full h-[20px]">
						<Skeleton width="100%" height="20px" />
					</span>
					<span className="w-full h-[20px]">
						<Skeleton width="100%" height="20px" />
					</span>
				</div>
			</div>
		</div>
	);
};
