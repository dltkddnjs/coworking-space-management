import type { NextApiRequest, NextApiResponse } from 'next';

export default function getUnitItemDataByUnitId(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id },
  } = req;

  const unitItemDatas = require(`../unit-item.json`);

  const pathId = Number(id);

  const filteredUnitItemDatas = unitItemDatas.filter(
    (data: UnitITemDataType) => data.unitId === pathId,
  );

  res.status(200).json(filteredUnitItemDatas);
}
