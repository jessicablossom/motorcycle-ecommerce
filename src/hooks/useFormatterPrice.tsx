import { useEffect, useState } from 'react';

const useFormattedPrice = (amount: number, currency: string): string => {
	const [formattedPrice, setFormattedPrice] = useState<string>('');

	useEffect(() => {
		const formattedPrice = formatPrice(amount, currency);
		setFormattedPrice(formattedPrice);
	}, [amount, currency]);

	const formatPrice = (amount: number, currency: string): string => {
		if (!currency) {
			currency = 'USD';
		}
		return amount.toLocaleString('en-US', {
			style: 'currency',
			currency: currency,
			minimumFractionDigits: 2,
		});
	};

	return formattedPrice;
};

export default useFormattedPrice;
