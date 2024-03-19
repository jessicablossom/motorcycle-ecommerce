import React from 'react';
import Link from 'next/link';

import { ProductCardProps } from '../utils/types';
import useFormattedPrice from '../hooks/useFormatterPrice';
import { getColor } from '../utils/colors';
import { getCategory } from '../utils/products';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const { name, variants } = product;
	const variant = variants && variants[0];
	const price = variant && variant.prices && variant.prices[0];
	const actualAmount = price ? price.amount : 0;
	const actualCurrency = price ? price.currency : 'USD';
	const itemMotocycle = product.categories[0].name === 'Motos';
	const category = getCategory(product);
	const formattedPrice = useFormattedPrice(actualAmount, actualCurrency);
	const colorCode = getColor(product.variants[0].name);

	return (
		<Link className='h-full' href={`/productDetailPage?category=${category}&uuid=${product.uuid}`}>
			<div className='w-full h-full border rounded-lg p-4  flex flex-col justify-between items-center hover:border-violet-400'>
				{variants && variants[0] && variants[0].images && variants[0].images[0] && (
					<div
						className='w-full h-48'
						style={{
							backgroundImage: `url(${variants[0].images[0].url})`,
							backgroundSize: 'contain',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
						}}
					/>
				)}
				{itemMotocycle && (
					<div className='border rounded-full flex items-center pr-4 m-1 w-fit'>
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 border-4 ${colorCode}!`}
						/>
						<p className='text-base font-medium mb-1 text-slate-500 uppercase'>{variant.name}</p>
					</div>
				)}

				<h2 className='text-3xl font-bold mb-1 text-center'>{name}</h2>
				{variants[0] && (
					<h2 className='text-xl font-semibold mb-1 text-gray-400 text-center'>{formattedPrice}</h2>
				)}
				{itemMotocycle && (
					<>
						<div className='flex justify-center items-center text-gray-400 m-1'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='2'
								stroke='currentColor'
								className='w-4 h-4'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
								/>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
								/>
							</svg>
							<h4 className='text-sm font-normal uppercase'>CONCESIONARIO {product.seller.name}</h4>
						</div>
						<div className='flex justify-center items-center'>
							<div className='flex flex-col items-center border h-fit w-20 rounded-s-lg p-1'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									className='w-6 h-6 text-violet-500'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z'
									/>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
									/>
								</svg>
								<h4 className='text-gray-400'>Motor</h4>
								<h4 className='text-semibold text-gray-600'>
									{product.variants[0].details.motors[0].value}
								</h4>
							</div>
							<div className='flex flex-col items-center border h-fit w-20 p-1'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									className='w-6 h-6 text-violet-500'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z'
									/>
								</svg>
								<h4 className='text-gray-400'>Categoria</h4>
								<h4 className='text-semibold text-gray-600'>{product.categories[0].name}</h4>
							</div>
							<div className='flex flex-col items-center border h-fit w-20 rounded-e-lg p-1'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									className='w-6 h-6 text-violet-500'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z'
									/>
								</svg>

								<h4 className='text-gray-400'>Año</h4>
								<h4 className='text-semibold text-gray-600'>
									{product.variants[0].details.years[0].value}
								</h4>
							</div>
						</div>
					</>
				)}
			</div>
		</Link>
	);
};

export default ProductCard;
