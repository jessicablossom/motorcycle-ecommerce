import axios from 'axios';

const useApi = () => {
	const getAccessories = async () => {
		try {
			const response = await axios.get('/api/accessories');
			return response.data;
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
	return { getAccessories, getMotorcycles };
};

export default useApi;
