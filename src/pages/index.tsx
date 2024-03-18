import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import Layout from '../app/layout';
import React from 'react';

const Home = () => {
	return (
		<Layout>
			<div className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
				<section>Home</section>
				<section>Motos</section>
				<section>Accesorios</section>
			</div>
		</Layout>
	);
};

export default Home;
