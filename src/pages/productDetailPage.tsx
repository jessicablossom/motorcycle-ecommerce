import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../app/layout';
import { Product, Variant, Order } from '../utils/types';
import useFormattedPrice from '../hooks/useFormatterPrice';
import { useReservation } from '../contextAPI/reservationContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AddOnsGrid from '../components/AddOnsGrid';

const ProductDetailPage = () => {
	const router = useRouter();
	const { category, uuid } = router.query;
	const [product, setProduct] = useState<Product | undefined>();
	const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>();
	const [showAccessoryGrid, setShowAccessoryGrid] = useState<boolean>(false);
	const [selectedAccessoriesIds, setSelectedAccessoriesIds] = useState<string[]>([]);
	const actualAmount = product ? product?.variants[0].prices[0].amount : 0;
	const actualCurrency = product ? product?.variants[0].prices[0].currency : 'USD';
	const formattedPrice = useFormattedPrice(actualAmount, actualCurrency);
	const financedPrice = useFormattedPrice(actualAmount / 24, actualCurrency);
	const { addToReservation } = useReservation();

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

	const handleSelectedVariant = (variantId: string) => {
		const updatedVariant = product?.variants.find((variant) => variant.uuid === variantId);
		if (updatedVariant) {
			const updatedVariantId = updatedVariant.uuid;
			if (selectedVariantId === updatedVariantId) {
				setSelectedVariantId(undefined);
			} else {
				setSelectedVariantId(updatedVariantId);
			}
		}
	};

	const handleNextStep = () => {
		if (selectedVariantId) {
			const order: Order = {
				uuid: selectedVariantId,
				accessories: selectedAccessoriesIds,
				contact: {
					firstname: '',
					lastname: '',
					email: '',
					phone: '',
					finace: false,
				},
			};
			addToReservation(order);
			setSelectedVariantId(undefined);
			setSelectedAccessoriesIds([]);
		}
	};

	useEffect(() => {
		if (uuid && category) {
			fetchProductDetails();
		}
	}, [uuid]);

	console.log(selectedVariantId, 'variante');
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
												className={`w-full border box-border rounded-lg p-4 text-gray-600 mb-2 ${
													selectedVariantId === variant.uuid
														? ' border-violet-500'
														: 'hover:border-violet-500'
												}`}
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
														<button
															onClick={() => handleSelectedVariant(variant.uuid)}
															className={`p-2 pr-4 pl-4 rounded-full text-slate-50 w-48 ${
																selectedVariantId === variant.uuid
																	? 'border box-border border-violet-500 text-violet-500 font-medium'
																	: 'border bg-violet-500'
															}`}
														>
															{selectedVariantId === variant.uuid
																? 'Deseleccionar'
																: 'Seleccionar'}
														</button>
													</div>
												</ul>
											</div>
										);
									})}
									{category === 'motorcycles' && (
										<>
											<button
												className='flex items-center rounded-full p-2 border-violet-500 text-violet-500 text-center text-lg font-semibold w-3/6 cursor-pointer mt-2'
												onClick={toggleAccessories}
											>
												Agregá Accesorios{' '}
												{showAccessoryGrid === false ? (
													<div className='text-violet-500 border border-violet-500 rounded-full m-1'>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															fill='none'
															viewBox='0 0 24 24'
															stroke-width='2'
															stroke='currentColor'
															className='w-4 h-4 m-1'
														>
															<path
																stroke-linecap='round'
																stroke-linejoin='round'
																d='m19.5 8.25-7.5 7.5-7.5-7.5'
															/>
														</svg>
													</div>
												) : (
													<div className='text-violet-500 border border-violet-500 rounded-full m-1'>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															fill='none'
															viewBox='0 0 24 24'
															stroke-width='2'
															stroke='currentColor'
															className='w-4 h-4 m-1'
														>
															<path
																stroke-linecap='round'
																stroke-linejoin='round'
																d='m4.5 15.75 7.5-7.5 7.5 7.5'
															/>
														</svg>
													</div>
												)}
											</button>
											{showAccessoryGrid && <AddOnsGrid onSelect={setSelectedAccessoriesIds} />}
										</>
									)}
									<button
										onClick={handleNextStep}
										disabled={selectedVariantId === null}
										className={`rounded-full p-2 text-slate-50 text-center text-lg font-semibold w-3/6 cursor-pointer mt-4 ${
											selectedVariantId !== null ? 'bg-violet-500' : 'bg-gray-300'
										}`}
									>
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
