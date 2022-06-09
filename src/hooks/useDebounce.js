import { useEffect, useState } from 'react';

const useDebounce = (initialState = '', delay = 1000) => {
	const [value, setValue] = useState(initialState);
	useEffect(() => {
		const timeout = setTimeout(() => {
			setValue(initialState);
		}, delay);
		return () => {
			clearTimeout(timeout);
		};
	}, [initialState, delay]);
	return value;
};

export default useDebounce;
