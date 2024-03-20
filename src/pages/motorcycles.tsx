import { useState, useEffect } from 'react';
import React from 'react';
import ProductGrid from '../components/ProductGrid';
import useApi from '../hooks/useApi';

function Motos() {
	const [products, setProducts] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { getMotorcycles } = useApi();

	useEffect(() => {
		const fetchData = async () => {
			setProducts(await getMotorcycles());
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return <ProductGrid isLoading={isLoading} products={products} />;
}

export default Motos;
