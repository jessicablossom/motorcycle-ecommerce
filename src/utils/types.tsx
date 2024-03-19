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

export interface ProductGridProps {
	isLoading: boolean;
	products: Product[];
}

export interface Order {
	uuid: string;
	accessories?: string[];
	contact: {
		firstname: string;
		lastname: string;
		email: string;
		phone: string;
		finace: boolean;
		trade: boolean;
	};
}

export interface ReservationContextType {
	reservation: Order[];
	addToReservation: (order: Order) => void;
	removeFromReservation: (uuid: string) => void;
}

export interface Accessory {
	uuid: string;
	name: string;
	variants: {
		details: {
			features: { value: string }[];
		};
		name: string;
		images: { url: string }[];
		prices: { amount: number; currency: string }[];
	}[];
}

export interface AddOnsGridProps {
	onSelectAccessory: (selectedAccessories: Accessory[]) => void;
}
