import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SelectedAccessory, AddOnsGridProps } from '../utils/types';

const AddOnsGrid: React.FC<AddOnsGridProps> = ({ onSelect }) => {
	const [accessories, setAccessories] = useState<SelectedAccessory[]>([]);
	const [selectedAccessories, setSelectedAccessories] = useState<SelectedAccessory[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const handleAccessorySelection = (accessory: SelectedAccessory) => {
		setSelectedAccessories((prevAccessories) => {
			const existingIndex = prevAccessories.findIndex((item) => item.uuid === accessory.uuid);
			if (existingIndex !== -1) {
				const updatedAccessories = [...prevAccessories];
				updatedAccessories.splice(existingIndex, 1);
				return updatedAccessories;
			} else {
				return [...prevAccessories, accessory];
			}
		});
	};

	useEffect(() => {
		onSelect(selectedAccessories.map((item) => item.uuid));
	}, [selectedAccessories]);

	useEffect(() => {
		const fetchAccessories = async () => {
			try {
				const response = await axios.get('/api/accessories');
				const transformedAccessories = response.data.map((accessory: any) => ({
					uuid: accessory.uuid,
					name: accessory.name,
					variants: accessory.variants,
				}));
				setAccessories(transformedAccessories);
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
					onClick={() => handleAccessorySelection(accessory)}
					className={`border p-2 rounded-lg flex flex-col w-full h-32 items-center justify-between text-center cursor-pointer
				 ${
						selectedAccessories.some((selected) => selected.uuid === accessory.uuid)
							? 'bg-violet-500 text-slate-50 font-semibold'
							: 'border-2 hover:border-violet-500'
					}`}
				>
					<div className='text-xs max-width-5'>{accessory.name}</div>
					<img
						src={accessory.variants[0].images[0].url}
						alt={`Accessory Image ${index}`}
						className='w-16 h-16 object-cover rounded-lg'
					/>
				</div>
			))}
			<div className='col-span-5 grid grid-cols-2 gap-1 w-full text-medium'>
				{selectedAccessories.map((accessory, index) => {
					return (
						<React.Fragment key={index}>
							<div>{accessory.name}</div>
							<div>
								{accessory.variants[0].prices[0].currency}{' '}
								{accessory.variants[0].prices[0].amount.toFixed(2)}
							</div>
						</React.Fragment>
					);
				})}
			</div>

			{isLoading && <div> is Loading</div>}
		</div>
	);
};

export default AddOnsGrid;
