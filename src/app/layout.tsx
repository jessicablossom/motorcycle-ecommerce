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
		{children}
		<Footer />
	</>
);

export default Layout;
