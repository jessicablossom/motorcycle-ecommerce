import { ReactNode } from 'react';

export interface Product {
	name: string;
	uuid: string;
	categories: { name: string }[];
	seller: { name: string };
	accessories: [];
	variants: {
		details: {
			motors: { value: string }[];
			years: { value: string }[];
			features: { value: string }[];
		};
		name: string;
		images: { url: string }[];
		prices: { amount: number; currency: string }[];
	}[];
}

export interface NavItemProps {
	href: string;
	children: ReactNode;
}

export interface ProductCardProps {
	product: Product;
}
