import { Product } from './types';

export const getCategory = (product: Product) => {
	switch (product.categories[0].name) {
		case 'Motos':
			return 'motorcycles';
		case 'Accesorios':
			return 'accessories';
		default:
			return '';
	}
};
