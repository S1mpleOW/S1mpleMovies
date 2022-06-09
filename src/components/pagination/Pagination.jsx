import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
const itemPerPage = 20;
const Pagination = ({ total_results, setPageIndex }) => {
	const [pageCount, setPageCount] = useState(total_results);
	const [itemOffset, setItemOffset] = useState(1);
	useEffect(() => {
		if (!total_results) return;
		setPageCount(Math.ceil(total_results / itemPerPage));
	}, [itemOffset]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemPerPage) % total_results;
		setItemOffset(newOffset);
		setPageIndex(event.selected + 1);
	};
	return (
		<div className="flex items-center justify-center mt-10 gap-x-5">
			<div className="flex items-center justify-center gap-x-5">
				{/* <span className="inline-block px-4 py-2 font-bold leading-none rounded-md cursor-pointer bg-primary">
				 */}
				<ReactPaginate
					breakLabel="..."
					nextLabel={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6 cursor-pointer"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
						</svg>
					}
					onPageChange={handlePageClick}
					pageRangeDisplayed={3}
					pageCount={pageCount}
					previousLabel={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
					}
					renderOnZeroPageCount={null}
				/>
			</div>
		</div>
	);
};

export default Pagination;
