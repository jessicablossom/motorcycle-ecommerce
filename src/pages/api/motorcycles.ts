import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const response = await axios.get(
			'https://nathan.tasa.develop.simplitec.io/webhook/simplimuv/products/motorcycles',
			{
				headers: {
					Authorization: 'Bearer qwertyuiopasdfghjklzxcvbnm1234',
				},
			}
		);
		const data = response.data;
		res.status(200).json(data);
	} catch (error) {
		console.error('Error fetching motorcycles:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export default handler;
