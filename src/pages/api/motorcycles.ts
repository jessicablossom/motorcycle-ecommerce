import { NextApiRequest, NextApiResponse } from 'next';
import { get } from '../../utils/proxyApi';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { uuid } = req.query;
	const path = uuid === undefined ? '/products/motorcycles' : `/products/motorcycles?uuid=${uuid}`;
	return get(req, res, path);
};
