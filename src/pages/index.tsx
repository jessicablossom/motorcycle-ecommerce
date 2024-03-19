import React from 'react';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import Layout from '../app/layout';

const Home = () => {
	return (
		<Layout>
			<section id='#home' className='flex flex-col items-center justify-center'>
				<div
					className='w-full rounded-lg h-96 mt-12'
					style={{
						backgroundImage: 'url(/hero.jpeg)',
						backgroundSize: 'contain',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
					}}
				/>
				<div className='flex flex-col items-center justify-center'>
					<h4 className='text-3xl font-semibold mt-12 mb-4 text-center'>Conoce la familia Meteor</h4>
					<p className='text-md mb-8 w-3/6 text-center'>
						Sapien, duis commodo risus molestie pulvinar sit id id. Malesuada quam leo, quis venenatis
						integer pellentesque mauris. Sapien, duis commodo risus molestie pulvinar sit id id. Malesuada
						quam leo, quis venenatis integer pellentesque mauris.
					</p>
				</div>
			</section>
			<div
				className='w-full rounded-lg h-40'
				style={{
					backgroundImage: 'url(/newsletter.svg)',
					backgroundSize: 'contain',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			/>
			<section id='#motorcycles'>
				<div className='flex flex-col p-12'>
					<h4 className='text-3xl font-semibold mb-4 '>Motos</h4>
					<p className='text-md mb-8 '>
						Sapien, duis commodo risus molestie pulvinar sit id id. Malesuada quam leo, quis venenatis
						integer pellentesque mauris.
					</p>
				</div>
			</section>
			<section id='#accessories'>
				<div className='flex flex-col p-12'>
					<h4 className='text-3xl font-semibold mb-4 '>Accesorios</h4>
					<p className='text-md mb-8 '>
						Sapien, duis commodo risus molestie pulvinar sit id id. Malesuada quam leo, quis venenatis
						integer pellentesque mauris.
					</p>
				</div>
			</section>
		</Layout>
	);
};

export default Home;
