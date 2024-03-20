import React from 'react';
import { AddOnsGridProps } from '../utils/types';

const AddOnsGrid: React.FC<AddOnsGridProps> = ({ accessories, selectedIds, onSelect }) => {
	const selectedAccessories = accessories.filter((accessory) => selectedIds.find((uuid) => accessory.uuid === uuid));

	const handleAccessorySelection = (uuid: string) => {
		const existingIndex = selectedIds.findIndex((item) => item === uuid);
		if (existingIndex !== -1) {
			const updatedAccessories = [...selectedIds];
			updatedAccessories.splice(existingIndex, 1);
			onSelect(updatedAccessories);
		} else {
			onSelect([...selectedIds, uuid]);
		}
	};

	return (
		<div className='grid grid-cols-5 gap-4 w-full mt-4'>
			{accessories.map((accessory, index) => (
				<div
					key={index}
					onClick={() => handleAccessorySelection(accessory.uuid)}
					className={`border p-2 rounded-lg flex flex-col w-full h-32 items-center justify-between text-center cursor-pointer
				 ${
						selectedIds.some((uuid) => uuid === accessory.uuid)
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
		</div>
	);
};

export default AddOnsGrid;
