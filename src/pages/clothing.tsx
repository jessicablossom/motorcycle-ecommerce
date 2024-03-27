import React from 'react';
import Layout from '../app/layout';

const Clothing = () => {
	return (
		<Layout>
			<div className='flex flex-col gap:8 min-h-screen w-screen flex items-center justify-center p-10 lg:p-20 xl:pr-40 xl:pl-40 text-violet-600 text-4xl font-bold'>
				<div>Comming soon</div>
				<div>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='w-12 h-12'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
						/>
					</svg>
				</div>
			</div>
		</Layout>
	);
};

export default Clothing;
