import React from 'react';
import { ReactNode } from 'react';
import Link from 'next/link';
import { NavItemProps } from '../utils/types';

const NavItem = ({ href, children }: NavItemProps) => (
	<li className='flex items-center '>
		<Link href={href} className='text-gray-600 hover:text-violet-500'>
			{children}
		</Link>
	</li>
);

const Navbar = () => (
	<nav className='bg-white shadow-sm h-16 flex items-center justify-evenly px-4 sm:px-6 lg:px-8 fixed w-full top-0 right-0 z-40'>
		<div className='flex items-center'>
			<Link href='/'>
				<img src='/brand-logo.svg' alt='Brand Logo' className='h-10' />
			</Link>
		</div>
		<div className='hidden sm:block'>
			<ul className='flex text-s space-x-4'>
				<NavItem href='/'>Home</NavItem>
				<NavItem href='/motorcycles'>Motos</NavItem>
				<NavItem href='/accessories'>Accesorios</NavItem>
			</ul>
		</div>
		<div className='flex items-center'>
			<Link href='/cart' className='text-gray-600 hover:text-violet-500 mr-4'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					className='w-6 h-6'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={1.5}
						d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
					/>
				</svg>
			</Link>
		</div>
	</nav>
);

export default Navbar;
