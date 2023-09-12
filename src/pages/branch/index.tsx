import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';

import PageLayout from 'components/Layout';
import CustomHead from 'components/CustomHead';
import CustomTitle from 'components/CustomTitle';
import CustomStatistics from 'components/CustomStatistics';
import CustomTable from 'components/CustomTable';

export const getStaticProps: GetStaticProps<BranchProps> = async () => {
  const branchDatas = (await axios.get('http://localhost:3000/api/branch'))
    .data;

  return {
    props: {
      branchDatas,
    },
  };
};

const branchTablecolumns: ColumnsType<BranchDataType> = [
  {
    title: '순번',
    dataIndex: 'id',
    width: 20,
    align: 'center',
  },
  {
    title: '지점명',
    dataIndex: 'branchName',
    width: 70,
    align: 'center',
  },
  {
    title: '운영상태',
    dataIndex: 'isAvailable',
    width: 40,
    align: 'center',
    render: (text) => {
      return text === 1 ? (
        <Badge color="#02FE01" text="운영중" />
      ) : (
        <Badge color="#FF0000" text="미운영" />
      );
    },
  },
  {
    title: '검수상태',
    dataIndex: 'isExamined',
    width: 40,
    align: 'center',
    render: (text) => {
      if (text === 1) {
        return <Badge color="#02FE01" text="검수완료" />;
      } else if (text === 0) {
        return <Badge color="#004CF8" text="검수중" />;
      } else if (text === 2) {
        return <Badge color="#FF7800" text="검수반려" />;
      }
    },
  },
  {
    title: '룸 유형',
    dataIndex: 'numberOfUnits',
    width: 20,
    align: 'center',
    render: (text, row) => (
      <Link href="/unit/[id]" as={`/unit/${row.id}`}>
        {text}
      </Link>
    ),
  },
  {
    title: '등록일',
    dataIndex: 'createdAt',
    width: 50,
    align: 'center',
    render: (text) => {
      const today = new Date(text);
      return today.toLocaleDateString();
    },
  },
  {
    title: '수정일',
    dataIndex: 'updatedAt',
    width: 50,
    align: 'center',
    render: (text) => {
      const today = new Date(text);
      return today.toLocaleDateString();
    },
  },
];

const Branch = ({ branchDatas }: BranchProps) => {
  const countBranchState = (
    text: CountBranchStateInputTextType,
    stateNumber: number,
  ): number => {
    const stateCount = branchDatas.filter(
      (data: BranchDataType) => data[text] === stateNumber,
    ).length;
    return stateCount;
  }; // 창고 상태의 이용상태를 string type과 number type의 값을 매개변수로 받아와 이용상태에 맞는 개수를 세서 반환한다.

  const branchStatisticsDatas: Array<StatisticsDatasType> = [
    {
      id: 1,
      title: '전체',
      value: branchDatas.length,
    },
    {
      id: 2,
      badgeTitle: { title: '검수중', color: '#004CF8' },
      value: countBranchState('isExamined', 0),
    },
    {
      id: 3,
      badgeTitle: { title: '검수완료', color: '#02FE01' },
      value: countBranchState('isExamined', 1),
    },
    {
      id: 4,
      badgeTitle: { title: '검수반려', color: '#FF7800' },
      value: countBranchState('isExamined', 2),
    },
    {
      id: 5,
      badgeTitle: { title: '미운영', color: '#FF0000' },
      value: countBranchState('isAvailable', 0),
    },
    {
      id: 6,
      badgeTitle: { title: '운영중', color: '#02FE01' },
      value: countBranchState('isAvailable', 1),
    },
  ];

  return (
    <PageLayout>
      <CustomHead title="오피스 페이지" />
      <CustomTitle title="오피스" />
      <CustomStatistics data={branchStatisticsDatas} />
      <CustomTable
        columns={branchTablecolumns}
        data={branchDatas}
        pagination={true}
      />
    </PageLayout>
  );
};

export default Branch;
