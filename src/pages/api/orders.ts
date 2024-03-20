import { NextApiRequest, NextApiResponse } from 'next';
import { post } from '../../utils/proxyApi';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	return post(req, res, '/createlead');
};
