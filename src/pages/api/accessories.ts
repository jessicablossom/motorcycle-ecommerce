import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../utils/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { uuid } = req.query;
	const path = uuid === undefined ? '/products/accessories' : `/products/accessories?uuid=${uuid}`;
	return handler(req, res, path);
};
