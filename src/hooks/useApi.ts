import axios from 'axios';

const useApi = () => {
	const getAccessories = async () => {
		try {
			const response = await axios.get('/api/accessories');
			return response.data.map((accessory: any) => ({
				categories: accessory.categories,
				uuid: accessory.uuid,
				name: accessory.name,
				variants: accessory.variants,
			}));
		} catch (error) {
			console.error('Error fetching accessories:', error);
		}
	};

	const getMotorcycles = async () => {
		try {
			const response = await axios.get('/api/motorcycles');
			return response.data;
		} catch (error) {
			console.error('Error fetching motorcycles:', error);
		}
	};

	const createLead = async (lead: any) => {
		try {
			const response = await axios.post('/api/orders', lead);
			return response.data;
		} catch (error) {
			console.error('Error posting lead:', error);
		}
	};

	return { getAccessories, getMotorcycles, createLead };
};

export default useApi;
