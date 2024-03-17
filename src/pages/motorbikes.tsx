import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '@/app/layout';
import ProductCard from '@/components/ProductCard';

const Motorcycles: React.FC = () => {
	const [motorcycles, setMotorcycles] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('/api/motorcycles');
				setMotorcycles(response.data);
			} catch (error) {
				console.error('Error fetching motorcycles:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<Layout>
			{isLoading ? (
				<div>is loading...</div>
			) : (
				<div className='flex min-h-screen grid grid-col-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-4 justify-between p-24'>
					{motorcycles.map((motorcycle: any, index: number) => (
						<ProductCard key={index} product={motorcycle} />
					))}
				</div>
			)}
		</Layout>
	);
};

export default Motorcycles;
