import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import ProductGrid from '../components/ProductGrid';

function Motos() {
	const [products, setProducts] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('/api/accessories');
				setProducts(response.data);
			} catch (error) {
				console.error('Error fetching accessories:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return <ProductGrid isLoading={isLoading} products={products} />;
}

export default Motos;
