import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../app/layout';
import { Product, Order, Accessory } from '../utils/types';
import useFormattedPrice from '../hooks/useFormatterPrice';
import useApi from '../hooks/useApi';
import { useReservation } from '../contextAPI/reservationContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AddOnsGrid from '../components/AddOnsGrid';
import ContactForm from '../components/contactForm';
import Loader from '../components/common/Loader';

const ProductDetailPage = () => {
	const router = useRouter();
	const { getAccessories } = useApi();
	const { addToReservation, product, setProduct } = useReservation();

	const { category, uuid } = router.query;

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

	const fetchProductDetails = async () => {
		try {
			const response = await axios.get(`/api/${category}?uuid=${uuid}`);
			if (response.status === 200) {
				setProduct(response.data[0]);
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
			const order = {
				uuid: selectedVariantId,
				accessories: selectedAccessoriesIds,
			};
			addToReservation(order);
			setDisplayForm(true);
		}
	};

	const handleBuy = () => {
		const order = {
			accessories: [],
			contact: undefined,
		};
		addToReservation(order);
		router.push('/orderCreated');
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
			{isLoading ? (
				<Loader />
			) : (
				<div className='grid grid-col-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:grid-col-2 gap-10 p-20'>
					{product && product.variants.length > 0 && (
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
											className='w-full h-full object-contain'
										/>
									</div>
								)}
							</div>
							<div className='flex flex-col items-start w-full'>
								<div className='text-4xl font-medium mb-4'>{product.name}</div>
								<div className='text-2xl font-semibold text-gray-400'>{formattedPrice}</div>
								<>ó</>
								<div className='text-2xl font-semibold text-gray-400'>
									{financedPrice} por 24 meses.*
								</div>
								<div className='w-full border border-b border-gray-300 my-4'></div>

								{!displayForm && (
									<>
										{category === 'Motorcycle' && (
											<div className='text-lg font-bold mb-2'>Elegí tu versión</div>
										)}
										{product.variants.map((variant, index) => (
											<div
												key={index}
												className={`w-full border box-border rounded-lg shadow-md p-4 text-gray-600 mb-2 ${
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
										))}
										{category === 'motorcycles' && (
											<>
												<button
													className='flex items-center rounded-full p-2 border-violet-500 text-violet-500 text-center text-lg font-semibold w-1/2 cursor-pointer mt-2'
													onClick={toggleAccessories}
												>
													Agregá Accesorios
													<div className='text-violet-500 border border-violet-500 rounded-full m-1'>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															fill='none'
															viewBox='0 0 24 24'
															strokeWidth='2'
															stroke='currentColor'
															className='w-4 h-4 m-1'
														>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																d={
																	showAccessoryGrid
																		? 'm4.5 15.75 7.5-7.5 7.5 7.5'
																		: 'm19.5 8.25-7.5 7.5-7.5-7.5'
																}
															/>
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
												{selectedAccessories.length > 0 && (
													<>
														<h4 className='text-xl font-semibold mt-6'>
															Accesorios Seleccionados:
														</h4>
														<div className='grid grid-cols-3 gap-1 w-full text-medium mt-8 mb-8'>
															{selectedAccessories.map((accessory, index) => {
																return (
																	<div
																		key={index}
																		className='col-start-1 col-end-3 flex justify-between'
																	>
																		<div>{accessory.name}</div>
																		<div>
																			{accessory.variants[0].prices[0].currency}{' '}
																			{accessory.variants[0].prices[0].amount.toFixed(
																				2
																			)}
																		</div>
																	</div>
																);
															})}
															<div className='text-lg font-bold col-start-3 row-start-1 font-semibold text-right'>
																{`Total: ${selectedAccessories
																	.reduce(
																		(total, accessory) =>
																			total +
																			accessory.variants[0].prices[0].amount,
																		0
																	)
																	.toFixed(2)}`}
															</div>
														</div>
													</>
												)}
											</>
										)}
										<div className='flex justify-end mt-8 w-full'>
											<button
												onClick={category === 'motorcycles' ? handleRequestQuote : handleBuy}
												disabled={!selectedVariantId}
												className={`rounded-full p-2 text-slate-50 text-center text-lg font-semibold w-full lg:w-60 cursor-pointer mt-4 ${
													!!selectedVariantId ? 'bg-violet-500' : 'bg-gray-300'
												}`}
											>
												{category === 'motorcycles' ? 'Solicitar Cotización' : 'Comprar'}
											</button>
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
												strokeWidth='1.5'
												stroke='currentColor'
												className='w-6 h-6'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
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
				</div>
			)}
		</Layout>
	);
};

export default ProductDetailPage;
