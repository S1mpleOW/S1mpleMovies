import { lazy, Suspense } from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import 'swiper/scss';
import Loading from './components/loading/Loading';

const Main = lazy(() => import('./components/layout/Main'));
const HomePage = lazy(() => import('./pages/HomePage'));
const MoviePage = lazy(() => import('./pages/MoviePage'));
const MovieDetailPage = lazy(() => import('./pages/MovieDetailPage'));
const Banner = lazy(() => import('./components/banner/Banner'));

function App() {
	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				<Route element={<Main />}>
					<Route
						path="/"
						element={
							<>
								<Banner />
								<HomePage />
							</>
						}
					/>
					<Route path="/movies" element={<MoviePage />} />
					<Route path="/movies/:movieId" element={<MovieDetailPage />} />
				</Route>
			</Routes>
		</Suspense>
	);
}

export default App;
