import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../utils/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	return handler(req, res, '/products/accessories');
};
