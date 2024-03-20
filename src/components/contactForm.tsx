import React, { useState, ChangeEvent } from 'react';
import { useReservation } from '../contextAPI/reservationContext';
import useApi from '../hooks/useApi';
import { useRouter } from 'next/router';

const ContactForm = () => {
	const [formData, setFormData] = useState({
		contact: {
			firstname: '',
			lastname: '',
			email: '',
			phone: '',
			finace: false,
			trade: false,
		},
	});

	const { addToReservation, reservation } = useReservation();
	const { createLead } = useApi();
	const router = useRouter();

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = event.target;
		const newValue = type === 'checkbox' ? checked : value;
		setFormData((prevFormData) => ({
			...prevFormData,
			contact: {
				...prevFormData.contact,
				[name]: newValue,
			},
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		let payload = { ...reservation, ...formData };
		const sendData = async () => {
			await createLead(payload);
			addToReservation(formData);
			router.push('/orderCreated');
		};
		sendData();
	};

	return (
		<div className='  w-full'>
			<h4 className='text-2xl font-semibold mb-4'>Contacto:</h4>
			<form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4 border rounded-lg p-6 shadow-md'>
				<div className='mb-4'>
					<label className='block font-bold leading-tight mb-2 text-gray-700 text-sm' htmlFor='firstname'>
						Nombre
					</label>
					<input
						className='border focus:outline-none focus:border-violet-500 hover:border-violet-500 leading-tight px-3 py-2 rounded-full text-gray-700 w-full'
						name='firstname'
						title='Por favor ingrese su nombre'
						placeholder='Ingrese su nombre'
						type='text'
						value={formData.contact.firstname}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='mb-4'>
					<label className='block font-bold leading-tight mb-2 text-gray-700 text-sm' htmlFor='lastname'>
						Apellido
					</label>
					<input
						className='border focus:outline-none focus:border-violet-500 hover:border-violet-500 leading-tight px-3 py-2 rounded-full text-gray-700 w-full'
						name='lastname'
						placeholder='Ingrese su apellido'
						type='text'
						value={formData.contact.lastname}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className='mb-4'>
					<label className='block font-bold leading-tight mb-2 text-gray-700 text-sm' htmlFor='email'>
						Correo electrónico
					</label>
					<input
						className='border focus:outline-none focus:border-violet-500 hover:border-violet-500 leading-tight px-3 py-2 rounded-full text-gray-700 w-full'
						name='email'
						placeholder='Ingrese su correo electrónico'
						type='email'
						required
						onChange={handleInputChange}
						value={formData.contact.email}
					/>
				</div>
				<div className='mb-4'>
					<label className='block font-bold leading-tight mb-2 text-gray-700 text-sm' htmlFor='phone'>
						Teléfono
					</label>
					<input
						className='border focus:outline-none focus:border-violet-500 hover:border-violet-500 leading-tight px-3 py-2 rounded-full text-gray-700 w-full'
						name='phone'
						placeholder='Ingrese su número de teléfono'
						type='tel'
						value={formData.contact.phone}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className='mb-4'>
					<input
						className='leading-tight m-2 w-4 h-4'
						name='finace'
						type='checkbox'
						checked={formData.contact.finace}
						onChange={handleInputChange}
					/>
					<label className='font-bold text-gray-700 text-sm' htmlFor='finace'>
						Financiamiento
					</label>
				</div>
				<div className='mb-4'>
					<input
						className='leading-tight m-2 w-4 h-4'
						name='trade'
						type='checkbox'
						checked={formData.contact.trade}
						onChange={handleInputChange}
					/>
					<label className='font-bold text-gray-700 text-sm' htmlFor='trade'>
						Intercambio
					</label>
				</div>

				<button
					className='bg-violet-500 col-start-2 font-bold focus:outline-none focus:border-violet-500 p-2 rounded-full text-slate-50 w-full'
					type='submit'
				>
					Enviar
				</button>
			</form>
		</div>
	);
};

export default ContactForm;
