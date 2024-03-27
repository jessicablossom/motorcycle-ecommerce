import React, { useState, useEffect } from 'react';
import { ProductGridProps } from '../utils/types';
import Layout from '../app/layout';
import ProductCard from './ProductCard';
import Loader from './common/Loader';

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading }) => {
	const [sortedProducts, setSortedProducts] = useState(products);
	const [sortMethod, setSortMethod] = useState('');
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const sortByName = () => {
		const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));
		setSortedProducts(sorted);
		setSortMethod('name');
	};

	const sortByPriceAscending = () => {
		const sorted = [...products].sort((a, b) => a.variants[0].prices[0].amount - b.variants[0].prices[0].amount);
		setSortedProducts(sorted);
		setSortMethod('priceAscending');
	};

	const sortByPriceDescending = () => {
		const sorted = [...products].sort((a, b) => b.variants[0].prices[0].amount - a.variants[0].prices[0].amount);
		setSortedProducts(sorted);
		setSortMethod('priceDescending');
	};

	useEffect(() => {
		sortByName();
	}, [products]);

	const handleSortChange = (method: string) => {
		switch (method) {
			case 'name':
				sortByName();
				break;
			case 'priceAscending':
				sortByPriceAscending();
				break;
			case 'priceDescending':
				sortByPriceDescending();
				break;
			default:
				break;
		}
		setIsMenuOpen(false);
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<>
			<div className='flex flex-column relative w-full h-16 bg-gradient-to-r from-purple-100 from-1% via-purple-400 to-rose-200 bg-gradient-to-r from-rose-50 to-95% via-purple-400 to-purple-100 top-16'>
				<h4 className='flex text-center text-3xl font-medium items-center justify-center w-full text-slate-50'>
					Lorem ipsum dolor sit amet
				</h4>
			</div>

			<Layout>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<div className='flex flex-cols lg:flex-row items-start relative w-full top-12 lg:top-20 p-5 right-5 md:right-5 lg:right-16 xl:right-36 justify-end'>
							<div className='relative flex'>
								<div className='items-end justify-end'>
									<button
										type='button'
										onClick={toggleMenu}
										className='inline-flex justify-center items-end w-fit rounded-md border p-3 text-sm font-medium text-violet-700 bg-white hover:bg-gray-50 focus:outline-none focus:border-violet-500 focus:ring-violet-500 focus:ring-offset-violet-200 focus:ring-1'
										id='options-menu'
										aria-haspopup='true'
										aria-expanded={isMenuOpen ? 'true' : 'false'}
									>
										Ordenar por
										<svg
											className='-mr-1 ml-2 h-5 w-5'
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 20 20'
											fill='currentColor'
											aria-hidden='true'
										>
											<path
												fillRule='evenodd'
												d='M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z'
												clipRule='evenodd'
											/>
										</svg>
									</button>
								</div>
								{isMenuOpen && (
									<div
										className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
										role='menu'
										aria-orientation='vertical'
										aria-labelledby='options-menu'
									>
										<div className='py-1' role='none'>
											<button
												onClick={() => handleSortChange('name')}
												className='block px-4 py-2 text-sm text-gray-700 hover:text-white hover:bg-violet-500 w-full text-left'
												role='menuitem'
											>
												Nombre
											</button>
											<button
												onClick={() => handleSortChange('priceAscending')}
												className='block px-4 py-2 text-sm text-gray-700 hover:text-white hover:bg-violet-500 w-full text-left'
												role='menuitem'
											>
												Precio (Menor a Mayor)
											</button>
											<button
												onClick={() => handleSortChange('priceDescending')}
												className='block px-4 py-2 text-sm text-gray-700 hover:text-white hover:bg-violet-500 w-full text-left'
												role='menuitem'
											>
												Precio (Mayor a Menor)
											</button>
										</div>
									</div>
								)}
							</div>
						</div>
						<div className='flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-8 justify-between p-10 lg:p-20 xl:pr-40 xl:pl-40'>
							{sortedProducts.map((item: any, index: number) => (
								<ProductCard key={index} product={item} />
							))}
						</div>
					</>
				)}
			</Layout>
		</>
	);
};

export default ProductGrid;
