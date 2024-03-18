import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { productName, uuid } = req.query;

	console.log(productName, 'product name?');

	try {
		const response = await axios.get(
			`https://nathan.tasa.develop.simplitec.io/webhook/simplimuv/products/motorcycles?uuid=${uuid}`,
			{
				headers: {
					Authorization: `Bearer qwertyuiopasdfghjklzxcvbnm1234`,
				},
			}
		);
		const productData = response.data[0];
		res.status(200).json(productData);
	} catch (error) {
		console.error('Error fetching product:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
