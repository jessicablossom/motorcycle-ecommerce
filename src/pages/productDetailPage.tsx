import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../app/layout';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Product } from '../utils/types';
import useFormattedPrice from '../hooks/useFormatterPrice';
import AddOnsGrid from '../components/AddOnsGrid';

const ProductDetailPage = () => {
	const router = useRouter();
	const { category, uuid } = router.query;
	const [product, setProduct] = useState<Product | null>(null);
	const [showAccessoryGrid, setShowAccessoryGrid] = useState<boolean>(false);

	const actualAmount = product ? product?.variants[0].prices[0].amount : 0;
	const actualCurrency = product ? product?.variants[0].prices[0].currency : 'USD';
	const formattedPrice = useFormattedPrice(actualAmount, actualCurrency);
	const financedPrice = useFormattedPrice(actualAmount / 24, actualCurrency);

	const fetchProductDetails = async () => {
		try {
			const response = await fetch(`/api/${category}?uuid=${uuid}`);
			if (response.ok) {
				const data = await response.json();
				setProduct(data[0]);
			} else {
				console.error('Failed to fetch product details');
			}
		} catch (error) {
			console.error('Error fetching product details:', error);
		}
	};

	const toggleAccessories = () => {
		setShowAccessoryGrid((prevState) => !prevState);
	};

	const handleAccessorySelection = (selectedAccessories: string[]) => {
		console.log('Selected Accessories:', selectedAccessories);
	};

	useEffect(() => {
		if (uuid && category) {
			fetchProductDetails();
		}
	}, [uuid]);

	return (
		<Layout>
			<div className='grid grid-cols-2 gap-10 p-20'>
				{product ? (
					<>
						{product.variants.length > 0 && (
							<React.Fragment key={product.uuid}>
								<div className='h-full'>
									{product.variants[0].images.length > 1 ? (
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
												<div className='relative w-4/5' key={index}>
													<img
														src={image.url}
														alt={`Image ${index}`}
														className='w-full h-full contain'
													/>
												</div>
											))}
										</Carousel>
									) : (
										<div className='relative w-full h-full'>
											<img
												src={product.variants[0].images[0].url}
												alt={`Image ${product.name}`}
												style={{ width: '100%', height: '100%', objectFit: 'contain' }}
											/>
										</div>
									)}
								</div>
								<div className='flex flex-col items-start w-full'>
									<div className='text-4xl font-medium mb-4'>{product.name}</div>
									<div className='text-2xl font-semibold text-gray-400'>{formattedPrice}</div>
									<>O</>
									<div className='text-2xl font-semibold text-gray-400'>
										{financedPrice} por 24 meses.*
									</div>
									<div className='w-full border border-b border-gray-300 my-4'></div>
									<div className='text-lg font-bold mb-2'>Elegí tu versión</div>
									{product.variants.map((variant, index) => {
										return (
											<div
												key={index}
												className='w-full border border rounded-lg p-4 text-gray-600 hover:border-violet-500 mb-2'
											>
												<ul>
													<li className='text-lg font-semibold'>
														{product.name} - {variant.name}
													</li>
													{product.variants[0].details.features.map((feature, index) => {
														const value = feature.value.trim();
														return (
															<li className='text-gray-400' key={index}>
																{value}
															</li>
														);
													})}
													<div className='flex items-end justify-end'>
														<button className='bg-violet-500 p-2 pr-4 pl-4 rounded-full text-slate-50'>
															Seleccionar
														</button>
													</div>
												</ul>
											</div>
										);
									})}
									{category === 'motorcycles' && (
										<>
											<button
												className='border rounded-lg p-2 border-violet-500 hover:border-violet-500 hover:bg-violet-500 text-violet-500 hover:text-slate-50 text-center text-lg font-semibold w-full cursor-pointer mt-2'
												onClick={toggleAccessories}
											>
												Agregá Accesorios
											</button>
											{showAccessoryGrid && (
												<AddOnsGrid onSelectAccessory={handleAccessorySelection} />
											)}
										</>
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
