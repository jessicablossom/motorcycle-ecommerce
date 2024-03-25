import React from 'react';

const Footer = () => {
	return (
		<div className='h-full w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-4 text-white bg-purple-950'>
			<div className='flex flex-col items-start text-left justify-around h-full w-full p-10'>
				<img src='brand-white.svg' className='h-8 mb-2' />
				<ul>
					<li>Shop</li>
					<li>Accesorios</li>
					<li>Indumentaria</li>
				</ul>
			</div>
			<div className='flex flex-col items-start justify-start h-full w-full p-10'>
				<ul>
					<span className='text-lg font-bold mb-2'>Motos:</span>
					<li className='mb-1'>Bonneville T120</li>
					<li className='mb-1'>Meteor 350</li>
					<li className='mb-1'>Heritage Classic</li>
					<li className='mb-1'>Bonneville T120</li>
					<li className='mb-1'>Street Bob 114</li>
					<li className='mb-1'>Fat Bob 114</li>
				</ul>
			</div>
			<div className='flex items-start justify-start h-full w-full p-10'>
				<ul>
					<span className='text-lg font-bold mb-2'>Dirección:</span>
					<li className='mb-2'>Av. Del Libertador 3304, Vicente López, 1637, Argentina</li>
					<li className='mb-2'>info@revicentelopez.com</li>
					<li className='mb-2'>11 3221 9220</li>
				</ul>
			</div>
			<div className='flex flex-col items-start justify-start h-full w-full p-10'>
				<span className='text-lg font-bold mb-2'>Sobre nosotros</span>
				<span className='text-md font-light mb-2'>Contactanos</span>
				<ul className='flex w-fit gap-4'>
					<li className='flex items-center'>
						<i className='fab fa-facebook-square'></i>
					</li>
					<li className='flex items-center'>
						<i className='fab fa-instagram'></i>
					</li>
					<li className='flex items-center'>
						<i className='fab fa-twitter'></i>
					</li>
					<li className='flex items-centers'>
						<i className='fab fa-youtube'></i>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Footer;
