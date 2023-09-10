import type { NextApiRequest, NextApiResponse } from 'next';

export default function getUnitDataByBranchId(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id },
  } = req;

  const unitDatas = require('../unit.json');

  const filteredUnitData = unitDatas.filter(
    (data: UnitDataType) => data.branchId === Number(id),
  );

  res.status(200).json(filteredUnitData);
}
