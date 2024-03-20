import { ReactNode } from 'react';

export interface Product {
	name: string;
	uuid: string;
	categories: { name: string }[];
	seller: { name: string };
	accessories: any[];
	variants: Variant[];
}
export interface Variant {
	uuid: string;
	details: {
		motors: { value: string }[];
		years: { value: string }[];
		features: { value: string }[];
	};
	name: string;
	images: { url: string }[];
	prices: { amount: number; currency: string }[];
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
	accessories?: string[] | null;
	contact: {
		firstname: string;
		lastname: string;
		email: string;
		phone: string;
		finace: boolean;
		trade?: boolean;
	};
}

export interface ReservationContextType {
	product?: Product;
	setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
	reservation?: Order;
	addToReservation: (order: any) => void;
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
	accessories: Accessory[];
	selectedIds: string[];
	onSelect: (accessoriesIds: string[]) => void;
}
