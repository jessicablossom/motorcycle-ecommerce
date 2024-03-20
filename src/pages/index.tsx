import React from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import Layout from '../app/layout';

const Home = () => {
	return (
		<Layout>
			<div className='flex flex-col items-center justify-center'>
				<div
					className='w-full rounded-lg h-96 mt-20 bg-contain bg-center bg-no-repeat'
					style={{
						backgroundImage: 'url(/hero.jpeg)',
					}}
				/>
				<div className='flex flex-col items-center justify-center m-12'>
					<h4 className='text-3xl font-semibold mb-4 text-center'>Conoce la familia Meteor</h4>
					<p className='text-md mb-8 w-full lg:w-1/2 text-center '>
						Sapien, duis commodo risus molestie pulvinar sit id id. Malesuada quam leo, quis venenatis
						integer pellentesque mauris. Sapien, duis commodo risus molestie pulvinar sit id id. Malesuada
						quam leo, quis venenatis integer pellentesque mauris.
					</p>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
						<Link href='/motorcycles'>
							<img src='/card-test.svg' className='border p-2 rounded-lg shadow-lg' />
						</Link>
						<Link href='/motorcycles'>
							<img src='/card-test.svg' className='border p-2 rounded-lg shadow-lg' />
						</Link>
						<Link href='/motorcycles'>
							<img src='/card-test.svg' className='border p-2 rounded-lg shadow-lg' />
						</Link>
						<Link href='/motorcycles'>
							<img src='/card-test.svg' className='border p-2 rounded-lg shadow-lg' />
						</Link>
					</div>
				</div>
				<div className='flex flex-column w-full h-32 bg-gradient-to-r from-purple-100 from-1% via-purple-400 to-rose-200 bg-gradient-to-r from-rose-50 to-95% via-purple-400 to-purple-100 top-16'>
					<h4 className='flex text-lg lg:text-3xl font-bold items-center justify-start w-full lg:w-2/5 text-white m-10 lg:ml-40'>
						Entérate del último recorrido de la Meteor 350 por las sierras de Córdoba.
					</h4>
				</div>
				<div className='flex flex-col m-12'>
					<h4 className='text-3xl font-semibold mb-4 '>Accesorios</h4>
					<p className='text-md mb-2 '>
						Sapien, duis commodo risus molestie pulvinar sit id id. Malesuada quam leo, quis venenatis
						integer pellentesque mauris.
					</p>
					<Link className='text-lg font-bold text-violet-500' href={'/accessories'}>
						Ver mas
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
