import React from 'react';

const OrderDetails = ({ variant }) => {
	return (
		<div className='border  col-start-2 p-2'>
			<h4 className='text-2xl font-semibold mb-4'>Detalle de cotizacion:</h4>
			<div className='mb-4'>
				{variant.details.features.map((feature, index) => {
					return (
						<div key={index} className='text-gray-400 mb'>
							{feature.value}
						</div>
					);
				})}
			</div>
			<div className='grid grid-cols-2 gap-2'>
				<div className=' text-lg font-semibold'>Precio {variant.name}</div>
				<div>
					{variant.prices[0].currency}
					{variant.prices[0].amount.toFixed(2)}
				</div>
			</div>
		</div>
	);
};

export default OrderDetails;
