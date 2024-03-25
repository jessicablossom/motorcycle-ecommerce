import { useState, useEffect } from 'react';
import React from 'react';
import ProductGrid from '../components/ProductGrid';
import useServices from '../hooks/useServices';

const Accessories = () => {
	const [products, setProducts] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { getAccessories } = useServices();

	useEffect(() => {
		const fetchData = async () => {
			setProducts(await getAccessories());
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return <ProductGrid isLoading={isLoading} products={products} />;
};

export default Accessories;
