import React from 'react';
import { ReactNode } from 'react';
import Navbar from '../components/Navbar';

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
	<div>
		<Navbar />
		<div className='container mx-auto px-4 py-8'>{children}</div>
	</div>
);

export default Layout;
