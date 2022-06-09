import React from 'react';
import { NavLink } from 'react-router-dom';
const Header = () => {
	return (
		<header className="flex items-center justify-center py-10 text-white header gap-x-5">
			<NavLink
				to={'/'}
				className={({ isActive }) =>
					isActive ? 'text-primary' : 'hover:text-primary transition-colors duration-200'
				}
			>
				Home
			</NavLink>
			<NavLink
				to={'/movies'}
				className={({ isActive }) =>
					isActive ? 'text-primary' : 'hover:text-primary transition-colors duration-200'
				}
			>
				Movies
			</NavLink>
		</header>
	);
};

export default Header;
