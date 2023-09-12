import type { NextApiRequest, NextApiResponse } from 'next';
const unitItemDatas = require('./unit-item.json');

export default function getUnitItemData(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(200).json(unitItemDatas);
}
