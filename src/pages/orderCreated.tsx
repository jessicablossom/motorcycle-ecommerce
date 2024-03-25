import React, { useEffect, useState } from 'react';
import Layout from '../app/layout';
import { useReservation } from '../contextAPI/reservationContext';
import useServices from '../hooks/useServices';
import { Accessory } from '../utils/types';

const OrderCreated = () => {
	const { reservation, product } = useReservation();
	const { getAccessories } = useServices();
	const variant = product && product.variants.find((variant) => reservation?.uuid === variant.uuid);
	const contact = reservation?.contact;
	const accessoriesIds = reservation?.accessories || [];
	const [accessories, setAccessories] = useState<Accessory[]>([]);
	const selectedAccessories =
		(accessories && accessories.filter((accessory) => accessoriesIds.find((uuid) => accessory.uuid === uuid))) ||
		[];
	useEffect(() => {
		const fetchData = async () => {
			setAccessories(await getAccessories());
		};
		fetchData();
	}, []);
	return (
		<Layout>
			<div className='flex items-center gap-10 p-10 p-10 sm:p-20 mt-10'>
				<div className='border rounded-lg p-10 w-full sm:w-full lg:w-3/6 h-fit m-auto shadow-lg'>
					<h4 className='text-2xl font-bold text-violet-600 mb-2'>¡Hemos recibido su solicitud!</h4>
					<h4 className='text-lg font-normal text-gray-400'>
						Un distribuidor hará un seguimiento de los próximos pasos relacionados con su reserva.
					</h4>
					<div className='border border-b mt-4' />{' '}
					{product && variant && (
						<>
							<h4 className='text-xl font-bold text-gray-600 mb-2'>{product.name}</h4>{' '}
							<div className=''>{variant.name}</div>
							<div className=''>{variant.details.features[0].value}</div>{' '}
						</>
					)}
					{selectedAccessories.length > 0 && (
						<>
							<div className='border border-b mt-4' />{' '}
							<h4 className='text-xl font-bold text-gray-600 mb-2'>Accessorios</h4>
							{selectedAccessories.map((accessory, index) => (
								<div className=''>{accessory.name}</div>
							))}{' '}
						</>
					)}
					{contact && (
						<>
							<div className='border border-b mt-4' />{' '}
							<h4 className='text-xl font-bold text-gray-600 mb-2'>Detalles</h4>
							<div className='contact-info'>
								{' '}
								<div className='contact-item'>
									<span className='font-semibold'>Nombre:</span> {contact.firstname}{' '}
								</div>
								<div className='contact-item'>
									{' '}
									<span className='font-semibold'>Apellido:</span> {contact.lastname}
								</div>{' '}
								<div className='contact-item'>
									<span className='font-semibold'>Correo electrónico:</span> {contact.email}
								</div>{' '}
								<div className='contact-item'>
									<span className='font-semibold'>Teléfono:</span> {contact.phone}{' '}
								</div>
							</div>{' '}
						</>
					)}
				</div>
			</div>{' '}
		</Layout>
	);
};
export default OrderCreated;
