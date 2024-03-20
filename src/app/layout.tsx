import React from 'react';
import { ReactNode } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
	<>
		<Navbar />
		<div className='container mx-auto px-4 py-8'>{children}</div>
		<Footer />
	</>
);

export default Layout;
