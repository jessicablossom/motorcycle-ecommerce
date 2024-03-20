import React from 'react';
import { ProductGridProps } from '../utils/types';
import Layout from '../app/layout';
import ProductCard from './ProductCard';

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading }) => {
	return (
		<>
			<div className='flex flex-column relative w-full h-16 bg-gradient-to-r from-purple-100 from-1% via-purple-400 to-rose-200 bg-gradient-to-r from-rose-50 to-95% via-purple-400 to-purple-100 top-16'>
				<h4 className='flex text-center text-3xl font-medium items-center justify-center w-full text-slate-50'>
					Lorem ipsum dolor sit amet
				</h4>
			</div>

			<Layout>
				{isLoading ? (
					<div>is loading...</div>
				) : (
					<>
						<div className='flex flex-row relative gap-4 w-full h-fit top-10 m-2 pl-20 '>
							<button className='flex flex-row w-fit h-fit rounded-lg border p-3 gap-3 hover:text-violet-500 hover:border-violet-400 hover:bg-violet-100'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									className='w-6 h-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z'
									/>
								</svg>
								Categorias
							</button>
							<button className='flex flex-row w-fit h-fit rounded-lg border p-3 gap-3 hover:text-violet-500 hover:border-violet-400 hover:bg-violet-100'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									className='w-6 h-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
									/>
								</svg>
								Precio
							</button>
							<button className='flex flex-row w-fit h-fit rounded-lg border p-3 gap-3 hover:text-violet-500 hover:border-violet-400 hover:bg-violet-100 self-end'>
								Orden:
							</button>
						</div>
						<div className='flex min-h-screen grid grid-col-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-8 justify-between p-20'>
							{products &&
								products.map((item: any, index: number) => <ProductCard key={index} product={item} />)}
						</div>
					</>
				)}
			</Layout>
		</>
	);
};

export default ProductGrid;
