import React from 'react';
import { AddOnsGridProps } from '../utils/types';

const AddOnsGrid: React.FC<AddOnsGridProps> = ({ accessories, selectedIds, onSelect }) => {
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
		<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 grid-rows-4 md:grid-rows-2 w-full mt-4'>
			{accessories.map((accessory, index) => {
				const isSelected = selectedIds.some((uuid) => uuid === accessory.uuid);
				return (
					<div
						key={index}
						onClick={() => handleAccessorySelection(accessory.uuid)}
						className={`border p-2 rounded-lg shadow-md flex flex-col w-full h-full items-center justify-between text-center cursor-pointer relative
						${isSelected ? 'border border-violet-500 font-semibold' : 'border hover:border-violet-500'}`}
					>
						<div className='text-md lg:text-sm xl:text-md '>{accessory.name}</div>
						<img
							src={accessory.variants[0].images[0].url}
							alt={`Accessory Image ${index}`}
							className='object-contain rounded-lg w-16 h-16'
						/>
						{isSelected && (
							<div className='absolute bottom-1 right-1'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='green'
									className='w-6 h-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
									/>
								</svg>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default AddOnsGrid;
