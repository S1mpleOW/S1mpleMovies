import React from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import MovieCard from '../components/movie/MovieCard';
import { fetcher } from '../config';

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
const MovieDetailPage = () => {
	const { movieId } = useParams();
	const { data } = useSWR(
		`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_API_KEY}`,
		fetcher
	);
	if (!data) return null;
	const { backdrop_path, poster_path, title, genres, overview } = data;
	console.log(data);
	return (
		<div className="">
			<div
				className="relative w-full h-screen bg-no-repeat bg-cover"
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
				}}
			>
				<div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-30"></div>
			</div>
			<div className="w-full max-w-[800px] h-[400px] mx-auto -mt-[200px] relative z-10 mb-5">
				<img
					src={`https://image.tmdb.org/t/p/original${poster_path}`}
					alt=""
					className="object-cover w-full h-full rounded-xl"
				/>
				<h3 className="my-5 text-3xl font-bold text-center text-white">{title}</h3>
				{genres.length > 0 && (
					<div className="flex items-center mb-5 gap-x-5">
						{genres.map((genre) => (
							<span
								key={genre.id}
								className="px-5 py-2 bg-gray-800 border rounded-full text-primary text-md border-primary"
							>
								{genre.name}
							</span>
						))}
					</div>
				)}
				<p className="block w-full pb-20 leading-relaxed text-center">{overview}</p>
			</div>
			<MovieCasts></MovieCasts>
			<MovieVideos></MovieVideos>
			<MovieSimilar></MovieSimilar>
		</div>
	);
};

const MovieCasts = () => {
	const { movieId } = useParams();
	const { data } = useSWR(
		`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_API_KEY}`,
		fetcher
	);
	if (!data || data.cast.length === 0) return null;
	const { cast: casts } = data;
	return (
		<div className="grid w-full grid-cols-4 gap-5 mt-[250px] mb-[100px]">
			{casts.slice(0, 4).map((cast) => (
				<div className="max-h-[400px]" key={cast.id}>
					<img
						src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
						alt=""
						className="object-cover w-full h-full"
					/>
					<h3 className="my-5 text-xl font-bold text-center text-white">{cast.name}</h3>
				</div>
			))}
		</div>
	);
};

const MovieVideos = () => {
	const { movieId } = useParams();
	const { data } = useSWR(
		`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${
			import.meta.env.VITE_API_KEY
		}&language=en-US`,
		fetcher
	);
	if (!data) return null;
	const { results } = data;
	if (results.length === 0) return null;
	return (
		<div className="pb-10">
			<div className="flex flex-col gap-10">
				{results.slice(0, 4).map((video) => (
					<div className="flex flex-col" key={video.id}>
						<div className="mb-10">
							<span className="px-2 py-4 text-xl font-bold text-white bg-gray-800 border border-primary">
								{video.name}
							</span>
						</div>
						<iframe
							width="1280"
							height="720"
							src={`https://www.youtube.com/embed/${video.key}`}
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="object-fill w-full aspect-video"
						></iframe>
					</div>
				))}
			</div>
		</div>
	);
};

function MovieSimilar() {
	const { movieId } = useParams();
	const { data } = useSWR(
		`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${import.meta.env.VITE_API_KEY}`,
		fetcher
	);
	if (!data) return null;
	const { results: movies } = data;
	return (
		<div className="pb-10">
			<h2 className="mb-10 text-3xl font-medium">Similar movies</h2>
			<div className="movie-list">
				<Swiper spaceBetween={50} slidesPerView={4} grabCursor={true}>
					{movies.length > 0 &&
						movies.map((movie) => (
							<SwiperSlide key={movie.id}>
								<MovieCard item={movie}></MovieCard>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</div>
	);
}

export default MovieDetailPage;
