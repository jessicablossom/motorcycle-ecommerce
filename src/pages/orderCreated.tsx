import React from 'react';
import Layout from '../app/layout';
import { useReservation } from '../contextAPI/reservationContext';

const OrderCreated = () => {
	const { reservation } = useReservation();

	return (
		<Layout>
			<div className='flex items-center gap-10 p-20 '>
				<div className='border rounded-lg p-10 w-1/2 h-fit m-auto shadow-lg'>
					<h4 className='text-2xl font-bold text-violet-600 mb-2'>¡Hemos recibido su solicitud!</h4>
					<h4 className='text-lg font-normal text-gray-400'>
						Un distribuidor hará un seguimiento de los próximos pasos relacionados con su orden.
					</h4>
					{reservation?.contact && (
						<>
							<div className='border border-b mt-4' />
							<h4 className='text-xl font-bold text-gray-600 mb-2'>Detalles</h4>

							<div className='contact-info'>
								<div className='contact-item'>
									<span className='font-semibold'>Nombre:</span> {reservation?.contact.firstname}
								</div>
								<div className='contact-item'>
									<span className='font-semibold'>Apellido:</span> {reservation?.contact.lastname}
								</div>
								<div className='contact-item'>
									<span className='font-semibold'>Correo electrónico:</span>{' '}
									{reservation?.contact.email}
								</div>
								<div className='contact-item'>
									<span className='font-semibold'>Teléfono:</span> {reservation?.contact.phone}
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default OrderCreated;
