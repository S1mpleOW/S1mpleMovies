import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard, { SkeletonMovieCard } from './MovieCard';
import useSWR from 'swr';
import { fetcher } from '../../config';

//https://api.themoviedb.org/3/movie/now_playing?api_key=e6e34f0b8bc092adf6b29db7fad7e42d
const MovieList = ({ type = 'now_playing' }) => {
	const { data, error } = useSWR(
		`https://api.themoviedb.org/3/movie/${type}?api_key=${import.meta.env.VITE_API_KEY}`,
		fetcher
	);
	const loading = !data || error;
	const movies = data?.results || [];
	return (
		<div className="movie-list">
			{!loading ? (
				<Swiper spaceBetween={50} slidesPerView={4} grabCursor={true}>
					{movies.length > 0 &&
						movies.map((movie) => (
							<SwiperSlide key={movie.id}>
								<MovieCard item={movie}></MovieCard>
							</SwiperSlide>
						))}
				</Swiper>
			) : (
				<Swiper spaceBetween={50} slidesPerView={4} grabCursor={true}>
					{Array(5)
						.fill(0)
						.map((item, index) => (
							<SwiperSlide key={index}>
								<SkeletonMovieCard></SkeletonMovieCard>
							</SwiperSlide>
						))}
				</Swiper>
			)}
		</div>
	);
};

export default MovieList;
