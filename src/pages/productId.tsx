import React from 'react';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Layout from '../app/layout';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Product } from '../utils/types';
import useFormattedPrice from '../hooks/useFormatterPrice';
import axios from 'axios';

const ProductDetailPage = () => {
	const router = useRouter();
	const { uuid } = router.query;
	const [product, setProduct] = useState<Product | null>(null);

	const [accessories, setAccessories] = useState<any[]>([]);
	const [showAccessoryGrid, setShowAccessoryGrid] = useState<boolean>(false);
	const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(true);

	const actualAmount = product ? product?.variants[0].prices[0].amount : 0;
	const actualCurrency = product ? product?.variants[0].prices[0].currency : 'USD';
	const formattedPrice = useFormattedPrice(actualAmount, actualCurrency);
	const financedPrice = useFormattedPrice(actualAmount / 24, actualCurrency);

	const fetchProductDetails = async (uuid: string) => {
		try {
			const response = await fetch(`/api/products/productId?uuid=${uuid}`);
			if (response.ok) {
				const data = await response.json();
				setProduct(data);
			} else {
				console.error('Failed to fetch product details');
			}
		} catch (error) {
			console.error('Error fetching product details:', error);
		}
	};

	const handleAccessorySelection = (accessory: string) => {
		setSelectedAccessories((prevAccessories) => {
			if (prevAccessories.includes(accessory)) {
				return prevAccessories.filter((item) => item !== accessory);
			} else {
				return [...prevAccessories, accessory];
			}
		});
	};

	const toggleAccessories = () => {
		setShowAccessoryGrid((prevState) => !prevState);
	};

	useEffect(() => {
		if (uuid) {
			fetchProductDetails(uuid as string);
		}
	}, [uuid]);

	useEffect(() => {
		const fetchAccessories = async () => {
			try {
				const response = await axios.get('/api/accessories');
				setAccessories(response.data);
			} catch (error) {
				console.error('Error fetching accessories:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAccessories();
	}, []);

	return (
		<Layout>
			<div className=' flex absolute top-20 gap-10'>
				{product ? (
					<>
						{product.variants.length > 0 && (
							<React.Fragment key={product.uuid}>
								<div style={{ width: '40rem', height: '25rem' }}>
									<Carousel
										showArrows={true}
										showStatus={false}
										infiniteLoop={true}
										interval={5000}
										transitionTime={500}
										stopOnHover={true}
										swipeable={true}
									>
										{product.variants[0].images.map((image, index) => (
											<div
												key={index}
												style={{ position: 'relative', width: '100%', height: '100%' }}
											>
												<img
													src={image.url}
													alt={`Image ${index}`}
													style={{ width: '100%', height: '100%', objectFit: 'cover' }}
												/>
											</div>
										))}
									</Carousel>
								</div>
								<div className='flex flex-col items-start'>
									<div className='text-4xl font-medium mb-4'>{product.name}</div>
									<div className='text-2xl font-semibold text-gray-400'>{formattedPrice}</div>
									<>O</>
									<div className='text-2xl font-semibold text-gray-400'>
										{financedPrice} por 24 meses.*
									</div>
									<div className='w-full border-1.5 border-b border-gray-300 my-4'></div>
									<div className='text-lg font-bold mb-2'>Elegí tu versión</div>
									<div className='border border-2 rounded-lg p-4 text-gray-600 hover:border-violet-500 mb-2'>
										<ul>
											<span className='text-lg font-semibold'>{product.name} </span> -
											<span> {product.variants[0].name}</span>
											{product.variants[0].details.features.map((feature, index) => {
												const value = feature.value.trim();
												if (
													value.startsWith('Motor') ||
													value.startsWith('Potencia') ||
													value.startsWith('Origen')
												) {
													return (
														<li className='text-gray-400' key={index}>
															{value}
														</li>
													);
												}
												return null;
											})}
										</ul>
									</div>
									<button
										className='border-2 rounded-lg p-2 border-violet-500 hover:border-violet-500 hover:bg-violet-500 text-violet-500 hover:text-slate-50 text-center text-lg font-semibold w-full cursor-pointer mt-2'
										onClick={toggleAccessories}
									>
										Agregá Accesorios
									</button>

									{showAccessoryGrid && (
										<div className='grid grid-cols-5 gap-4 w-full mt-4'>
											{accessories.map((accessory, index) => (
												<div
													key={index}
													className='border hover:border-violet-500 p-2 rounded-lg flex flex-col w-full max-w-24 h-32 items-center text-center'
												>
													<div className='text-xs max-width-5'>{accessory.name}</div>
													<img
														src={accessory.variants[0].images[0].url}
														alt={`Accessory Image ${index}`}
														style={{ width: '60px', height: '60px', objectFit: 'cover' }}
														className='mb-2 rounded-lg'
													/>
												</div>
											))}
										</div>
									)}
									<button className='rounded-lg p-2 bg-violet-500 hover:bg-violet-500 text-slate-50 text-center text-lg font-semibold w-full cursor-pointer mt-4'>
										Siguiente
									</button>
								</div>
							</React.Fragment>
						)}
					</>
				) : (
					<div>Loading...</div>
				)}
			</div>
		</Layout>
	);
};

export default ProductDetailPage;
