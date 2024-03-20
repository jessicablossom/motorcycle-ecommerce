import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../utils/proxyApi';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { uuid } = req.query;
	const path = uuid === undefined ? '/products/motorcycles' : `/products/motorcycles?uuid=${uuid}`;
	return handler(req, res, path);
};
