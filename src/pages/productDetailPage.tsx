import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../app/layout';
import { Product, Order, Accessory } from '../utils/types';
import useFormattedPrice from '../hooks/useFormatterPrice';
import useApi from '../hooks/useApi';
import { useReservation } from '../contextAPI/reservationContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AddOnsGrid from '../components/AddOnsGrid';
import ContactForm from '../components/contactForm';

const ProductDetailPage = () => {
	const router = useRouter();
	const { getAccessories } = useApi();
	const { addToReservation } = useReservation();

	const { category, uuid } = router.query;
	const [product, setProduct] = useState<Product | undefined>();

	const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>();
	const selectedVariant = product && product.variants.find((variant) => selectedVariantId === variant.uuid);

	const [showAccessoryGrid, setShowAccessoryGrid] = useState<boolean>(false);
	const [accessories, setAccessories] = useState<Accessory[]>([]);
	const [selectedAccessoriesIds, setSelectedAccessoriesIds] = useState<string[]>([]);
	const selectedAccessories =
		accessories &&
		accessories.filter((accessory) => selectedAccessoriesIds.find((uuid) => accessory.uuid === uuid));

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [displayForm, setDisplayForm] = useState<boolean>(false);

	const actualAmount = product ? product?.variants[0].prices[0].amount : 0;
	const actualCurrency = product ? product?.variants[0].prices[0].currency : 'USD';
	const formattedPrice = useFormattedPrice(actualAmount, actualCurrency);
	const financedPrice = useFormattedPrice(actualAmount / 24, actualCurrency);

	const calculateReservationPrice = (amount: number) => {
		return (amount * 0.01).toFixed(2);
	};

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

	const handleRequestQuote = () => {
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
			setDisplayForm(true);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setAccessories(await getAccessories());
			setIsLoading(false);
		};
		fetchData();
		if (uuid && category) {
			fetchProductDetails();
		}
	}, [uuid, category]);

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

									{!displayForm && (
										<>
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
															{product.variants[0].details.features.map(
																(feature, index) => {
																	const value = feature.value.trim();
																	return (
																		<li className='text-gray-400' key={index}>
																			{value}
																		</li>
																	);
																}
															)}
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
														Agregá Accesorios
														<div className='text-violet-500 border border-violet-500 rounded-full m-1'>
															<svg
																xmlns='http://www.w3.org/2000/svg'
																fill='none'
																viewBox='0 0 24 24'
																stroke-width='2'
																stroke='currentColor'
																className='w-4 h-4 m-1'
															>
																{showAccessoryGrid ? (
																	<path
																		stroke-linecap='round'
																		stroke-linejoin='round'
																		d='m4.5 15.75 7.5-7.5 7.5 7.5'
																	/>
																) : (
																	<path
																		stroke-linecap='round'
																		stroke-linejoin='round'
																		d='m19.5 8.25-7.5 7.5-7.5-7.5'
																	/>
																)}
															</svg>
														</div>
													</button>
													{showAccessoryGrid && (
														<AddOnsGrid
															accessories={accessories}
															selectedIds={selectedAccessoriesIds}
															onSelect={setSelectedAccessoriesIds}
														/>
													)}
													{selectedAccessories && (
														<div className='grid grid-cols-2 gap-1 w-full text-medium mt-8 mb-8'>
															<h4 className='col-span-2'>Accesorios</h4>
															{selectedAccessories.map((accessory, index) => {
																return (
																	<React.Fragment key={index}>
																		<div>{accessory.name}</div>
																		<div>
																			{accessory.variants[0].prices[0].currency}{' '}
																			{accessory.variants[0].prices[0].amount.toFixed(
																				2
																			)}
																		</div>
																	</React.Fragment>
																);
															})}
														</div>
													)}
												</>
											)}
											<div className='flex justify-center mt-8'>
												{category === 'motorcycles' ? (
													<button
														onClick={() => handleRequestQuote()}
														disabled={!selectedVariantId}
														className={`rounded-full p-2 text-slate-50 text-center text-lg font-semibold w-60 cursor-pointer mt-4 ${
															!!selectedVariantId ? 'bg-violet-500' : 'bg-gray-300'
														}`}
													>
														Solicitar Cotización
													</button>
												) : (
													<button
														onClick={undefined}
														className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
													>
														Comprar
													</button>
												)}
											</div>
										</>
									)}
									{displayForm && (
										<>
											<button
												onClick={() => setDisplayForm(false)}
												className='flex text-violet-500 font-medium mb-2'
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 24 24'
													stroke-width='1.5'
													stroke='currentColor'
													className='w-6 h-6'
												>
													<path
														stroke-linecap='round'
														stroke-linejoin='round'
														d='M15.75 19.5 8.25 12l7.5-7.5'
													/>
												</svg>
												Volver
											</button>
											<ContactForm />
										</>
									)}
								</div>
							</React.Fragment>
						)}
					</>
				) : (
					<div>Loading...</div>
				)}

				{/* esto es para comprar accesorio desde detalle*/}
				{selectedVariant && (
					<div className='border border-slate-700 col-start-2 p-2'>
						<h4 className='text-2xl font-semibold mb-4'>Detalle de cotizacion:</h4>
						<div className='mb-4'>
							{selectedVariant?.details.features.map((feature, index) => {
								return (
									<div key={index} className='text-gray-400 mb'>
										{feature.value}
									</div>
								);
							})}
						</div>
						<div className='grid grid-cols-2 gap-2'>
							<div className=' text-lg font-semibold'>Precio {selectedVariant.name}</div>
							<div>
								{selectedVariant?.prices[0].currency}
								{selectedVariant?.prices[0].amount.toFixed(2)}
							</div>
							<div className=' text-lg font-semibold'>Precio Accesorios</div>
							<div>
								{selectedVariant?.prices[0].currency}
								{calculateReservationPrice(selectedVariant.prices[0].amount)}
							</div>
							<div className=' text-lg font-semibold'>Precio Reserva</div>
							<div>
								{selectedVariant?.prices[0].currency}
								{calculateReservationPrice(selectedVariant.prices[0].amount)}
							</div>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default ProductDetailPage;
