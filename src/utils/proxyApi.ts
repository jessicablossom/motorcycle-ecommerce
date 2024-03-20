import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = 'https://nathan.tasa.develop.simplitec.io/webhook/simplimuv';

const handler = async (req: NextApiRequest, res: NextApiResponse, path: string) => {
	try {
		const response = await axios.get(`${BASE_URL}${path}`, {
			headers: {
				Authorization: 'Bearer qwertyuiopasdfghjklzxcvbnm1234',
			},
		});
		const data = response.data;
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export default handler;
