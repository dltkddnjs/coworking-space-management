interface CustomButtonProps {
  buttonTitle: string;
}

interface CustomHeadProps {
  title: string;
}

interface CustomSelectProps {
  data: BranchDataType[];
  id: string;
}

interface CustomStatisticsProps {
  data: branchStatisticsDatasType[];
}

interface CustomTableProps {
  columns: Array<T>;
  data: Array<F>;
  pagination: boolean;
  buttonTitle: string;
}

interface CustomTitleProps {
  title: string;
}

interface StatisticsDatasType {
  id: number;
  title?: string;
  badgeTitle?: { title: string; color: string };
  value: number | string;
}

interface BranchDataType {
  key: React.Key;
  id: number;
  branchName: string;
  isAvailable: number;
  isExamined: number;
  numberOfUnits: number;
  createdAt: Date;
  updatedAt: Date;
}

interface UnitDataType {
  key: React.Key;
  id: number;
  branchId: number;
  unitName: string;
  numberOfUnitItems: number;
  width: number;
  depth: number;
  height: number;
  priceValue: number;
  createdAt: Date;
  updatedAt: Date;
  using: number;
}

interface UnitITemDataType {
  key: React.Key;
  id: number;
  unitId: number;
  unitItemName: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
