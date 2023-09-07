import type { NextApiRequest, NextApiResponse } from 'next';
const unitDatas = require('./unit.json');

export default function getUnitData(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(unitDatas);
}
