import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddOnsGrid = () => {
	const [accessories, setAccessories] = useState<any[]>([]);

	const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const handleAccessorySelection = (accessory: string) => {
		setSelectedAccessories((prevAccessories) => {
			if (prevAccessories.includes(accessory)) {
				return prevAccessories.filter((item) => item !== accessory);
			} else {
				return [...prevAccessories, accessory];
			}
		});
	};

	useEffect(() => {
		const fetchAccessories = async () => {
			try {
				const response = await axios.get('/api/accessories');
				setAccessories(response.data);
			} catch (error) {
				console.error('Error fetching accessories:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAccessories();
	}, []);

	return (
		<div className='grid grid-cols-5 gap-4 w-full mt-4'>
			{accessories.map((accessory, index) => (
				<div
					key={index}
					className='border hover:border-violet-500 p-2 rounded-lg flex flex-col w-full max-w-24 h-32 items-center text-center'
				>
					<div className='text-xs max-width-5'>{accessory.name}</div>
					<img
						src={accessory.variants[0].images[0].url}
						alt={`Accessory Image ${index}`}
						style={{ width: '60px', height: '60px', objectFit: 'cover' }}
						className='mb-2 rounded-lg'
					/>
				</div>
			))}
		</div>
	);
};

export default AddOnsGrid;
