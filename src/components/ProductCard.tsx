import React from 'react';

interface Product {
	name: string;
	seller: { name: string };
	variants: {
		name: string;
		images: { url: string }[];
		prices: { amount: number; currency: string }[];
	}[];
}

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const { name, variants } = product;
	const variant = variants && variants[0];
	const price = variant && variant.prices && variant.prices[0];
	const actualAmount = price ? price.amount : 0;
	const actualCurrency = price ? price.currency : 'USD';

	console.log(product.variants, 'variants');

	const formattedAmount = (amount: number, currency: string): string => {
		if (!currency) {
			currency = 'USD';
		}
		return amount.toLocaleString('en-US', {
			style: 'currency',
			currency: currency,
			minimumFractionDigits: 2,
		});
	};

	return (
		<div className='w-full h-full border rounded-lg p-4 mb-4 flex flex-col justify-between items-center'>
			{variants && variants[0] && variants[0].images && variants[0].images[0] && (
				<img src={variants[0].images[0].url} alt={name} className='w-full h-auto mb-1' />
			)}
			<h4 className='text-base font-medium mb-1 text-slate-500 capitalize'>{variant.name}</h4>
			<h2 className='text-2xl font-medium mb-1'>{name}</h2>

			{variants[0] && (
				<h2 className='text-xl font-normal mb-1 text-slate-500'>
					{formattedAmount(actualAmount, actualCurrency)}
				</h2>
			)}
			<div className='flex flex-col justify-center items-center gap-4'>
				<button className='bg-violet-500 text-white px-4 py-2 rounded-lg mr-2'>Ver más</button>
				<a href='#' className='text-violet-500 hover:underline'>
					Reservar
				</a>
			</div>
		</div>
	);
};

export default ProductCard;
