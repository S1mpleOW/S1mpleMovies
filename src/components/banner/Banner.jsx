import React, { Fragment } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../config';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loading from '../loading/Loading';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
	const { data, error1 } = useSWR(
		`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}`,
		fetcher
	);
	const { data: categories, error2 } = useSWR(
		`https://api.themoviedb.org/3/genre/movie/list?api_key=${
			import.meta.env.VITE_API_KEY
		}&language=en-US`,
		fetcher
	);
	const movies = data?.results || [];
	const loading = !data || error1 || error2 || !categories;
	return (
		<Fragment>
			{!loading ? (
				<Swiper spaceBetween={50} slidesPerView={1} grabCursor={true}>
					{movies.length > 0 &&
						movies.map((movie) => (
							<SwiperSlide key={movie.id}>
								<MovieItem movie={movie} id={movie.id} categories={categories}></MovieItem>
							</SwiperSlide>
						))}
				</Swiper>
			) : (
				<Loading></Loading>
			)}
		</Fragment>
	);
};

const MovieItem = ({ id, movie, categories }) => {
	if (!movie || !categories) return;
	const { backdrop_path, title, genre_ids } = movie;
	const { genres } = categories;
	const navigate = useNavigate();
	let url = `/movies/${id}`;
	return (
		<section className="h-full mb-20 overflow-hidden banner page-container-fluid">
			<div className="relative w-full h-full bg-white rounded-lg">
				<div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.6)] rounded-lg"></div>
				<img
					src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
					alt=""
					className="object-cover w-full h-full rounded-lg"
				/>
				<div className="absolute w-full text-white content left-5 bottom-5">
					<h2 className="text-2xl font-bold">{title}</h2>
					<div className="flex items-center my-5 shadow-2xl gap-x-3">
						<span className="px-4 py-2 border border-white rounded-md">Adventure</span>
						{genre_ids.length > 0 &&
							genre_ids.map((genre) => {
								const { name } = genres.find((g) => g.id === genre);
								return (
									<span className="px-4 py-2 border border-white rounded-md" key={genre}>
										{name}
									</span>
								);
							})}
					</div>
					<button
						className="px-6 py-3 font-medium text-white rounded-lg bg-primary"
						onClick={
							url
								? () => {
										navigate(url);
								  }
								: null
						}
					>
						Watch now
					</button>
				</div>
			</div>
		</section>
	);
};

export default Banner;
