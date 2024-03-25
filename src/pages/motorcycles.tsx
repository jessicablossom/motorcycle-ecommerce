import { useState, useEffect } from 'react';
import React from 'react';
import ProductGrid from '../components/ProductGrid';
import useServices from '../hooks/useServices';

const Motorcycles = () => {
	const [products, setProducts] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { getMotorcycles } = useServices();

	useEffect(() => {
		const fetchData = async () => {
			setProducts(await getMotorcycles());
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return <ProductGrid isLoading={isLoading} products={products} />;
};

export default Motorcycles;
