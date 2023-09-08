// 함수 매개변수 타입
type CountBranchStateInputTextType = 'isExamined' | 'isAvailable';

// 컴포넌트 타입
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

// API 데이터 타입
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

//페이지 타입
interface BranchProps {
  branchDatas: BranchDataType[];
}

interface UnitProps {
  id: string;
  branchDatas: BranchDataType[];
  unitIdDatas: UnitDataType[];
  filteredUnitItemDatas: UnitITemDataType[];
}
