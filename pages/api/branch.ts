import type { NextApiRequest, NextApiResponse } from 'next';
const branchDatas = require('./branch.json');

export default function getBranchData(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(200).json(branchDatas);
}
