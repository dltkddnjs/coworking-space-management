import { GetStaticPropsContext, PreviewData } from 'next';
import { Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ParsedUrlQuery } from 'querystring';
import axios from 'axios';

import PageLayout from 'components/Layout';
import CustomHead from 'components/CustomHead';
import CustomTitle from 'components/CustomTitle';
import CustomSelect from 'components/CustomSelect';
import CustomStatistics from 'components/CustomStatistics';
import CustomTable from 'components/CustomTable';
import { useRouter } from 'next/router';

export const getStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>,
) => {
  const id = context.params!.id as string;
  const branchDatas = (await axios.get('http://127.0.0.1:3000/api/branch'))
    .data;
  const unitItemDatas = (await axios.get('http://127.0.0.1:3000/api/unit-item'))
    .data;
  const unitIdDatas = (await axios.get(`http://127.0.0.1:3000/api/unit/${id}`))
    .data;

  const filteredUnitItemDatas = unitItemDatas.filter(
    (itemB: UnitITemDataType) => {
      return unitIdDatas.some((itemA: UnitDataType) => {
        return itemA.id === itemB.unitId;
      });
    },
  );

  return {
    props: {
      branchDatas,
      unitIdDatas,
      filteredUnitItemDatas,
    },
  };
};

export const getStaticPaths = async () => {
  const branchDatas = (await axios.get('http://127.0.0.1:3000/api/branch'))
    .data;

  const paths = branchDatas.map((data: BranchDataType) => ({
    params: { id: data.id.toString() },
  }));

  return { paths, fallback: false };
};

const unitItemTableColumns: ColumnsType<UnitITemDataType> = [
  {
    title: '룸 이름',
    dataIndex: 'unitItemName',
    width: 20,
    align: 'center',
  },
  {
    title: '룸',
    dataIndex: 'unitItemName',
    width: 70,
    align: 'center',
    render: (text: string) => {
      return text.replace(/[^a-zA-Z]/g, '');
    }, // unitItemName 값에서 문자열을 제외한 나머지 text 제거 후 반환
  },
  {
    title: '상태',
    width: 40,
    align: 'center',
    render: (row) => {
      const today = new Date();
      const startDate = new Date(row.startDate);
      const endDate = new Date(row.endDate);

      if (today.getTime() > endDate.getTime()) {
        return <Badge color="#CCCCCC" text="이용종료" />; // 오늘 날짜가 endDate 이후인 경우
      } else {
        return <Badge color="#004CF8" text="이용중" />; // 오늘 날짜가 startDate와 endDate 사이에 포함되어 있는 경우
      }
    },
  },
  {
    title: '이용기간 경과율',
    width: 40,
    align: 'center',
    render: (row) => {
      const startDate = new Date(row.startDate);
      const endDate = new Date(row.endDate);
      const today = new Date();

      if (today < startDate) {
        // 오늘 날짜가 시작일 이전인 경우
        return '0%';
      } else if (today > endDate) {
        // 오늘 날짜가 종료일 이후인 경우
        return '100%';
      } else {
        // 오늘 날짜가 시작일과 종료일 사이인 경우
        const totalDays = Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        ); // 총 일 수
        const elapsedDays = Math.ceil(
          (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        ); // 경과 일 수
        const percent = Math.ceil((elapsedDays / totalDays) * 100); // 경과율

        return `${percent}%`;
      }
    },
  },
  {
    title: '이용시작일',
    dataIndex: 'startDate',
    width: 20,
    align: 'center',
    render: (text: Date) => {
      const today = new Date(text);
      return today.toLocaleDateString();
    },
  },
  {
    title: '이용종료일',
    dataIndex: 'endDate',
    width: 50,
    align: 'center',
    render: (text: Date) => {
      const today = new Date(text);
      return today.toLocaleDateString();
    },
  },
];

const Unit = ({
  branchDatas,
  unitIdDatas,
  filteredUnitItemDatas,
}: UnitProps) => {
  const router = useRouter();
  const id = router.query.id as string;

  const sumNumberOfUnitItems = (unitIdData: UnitDataType[]) => {
    return unitIdData.reduce((acc, curr) => acc + curr.numberOfUnitItems, 0);
  }; // 총 유닛 개수

  const getNumberOfCurrentUnitStatus = () => {
    const returnUnitStatusAsNumber = filteredUnitItemDatas.map(
      (item: UnitITemDataType) => {
        const today = new Date();
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);
        if (today > endDate) {
          return 0;
        } else {
          return 1;
        }
      },
    ); // 날짜 계산을 통해 각 유닛 아이템의 이용상태를 숫자로 반환

    const CountUnitStatusAndMatchToKey = returnUnitStatusAsNumber.reduce(
      (acc, curr) => {
        acc[curr === 0 ? 'finish' : 'using']++;
        return acc;
      },
      { finish: 0, using: 0 },
    ); // 숫자로 반환된 이용상태의 개수를 세서 finish, using이라는 key의 value로 담는다

    return CountUnitStatusAndMatchToKey;
  };

  const calculateUsingUnitRatio = (
    totalUnitCount: number,
    usingUnitCount: number,
  ) => {
    const ratio = (usingUnitCount / totalUnitCount) * 100;
    const roundedRatio = Math.round(ratio);
    return roundedRatio;
  }; // 전체 유닛 개수에 대한 이용중인 유닛 개수를 백분율로 구하고 반올림해준다

  const countEachUnitUsingUnitItem = () => {
    const countEachUnitUsingUnitItemByUnitId = filteredUnitItemDatas.reduce(
      (acc: { [key: string]: number }, cur) => {
        const { unitId, startDate, endDate } = cur;
        const today = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (today >= start && today <= end) {
          acc[unitId] = (acc[unitId] || 0) + 1;
        }
        return acc;
      },
      {},
    ); // 유닛 아이디별 사용중인 개수를 세서 객체형태로 반환한다.

    return Object.values(countEachUnitUsingUnitItemByUnitId); // 객체의 value만 추출해서 배열형태로 변환
  };

  const unitTableColumns: ColumnsType<UnitDataType> = [
    {
      title: '룸',
      dataIndex: 'unitName',
      width: 20,
      align: 'center',
    },
    {
      title: '총개수',
      dataIndex: 'numberOfUnitItems',
      width: 70,
      align: 'center',
    },
    {
      title: '사용중',
      width: 40,
      align: 'center',
      render: (text, record, index) => {
        return countEachUnitUsingUnitItem()[index];
      },
    },
    {
      title: '점유율',
      width: 40,
      align: 'center',
      render: (text, record, index) => {
        const ratio =
          (countEachUnitUsingUnitItem()[index] / record.numberOfUnitItems) *
          100;
        const roundedRatio = Math.round(ratio);
        return roundedRatio + '%';
      },
    },
    {
      title: '너비',
      dataIndex: 'width',
      width: 20,
      align: 'center',
    },
    {
      title: '깊이',
      dataIndex: 'depth',
      width: 50,
      align: 'center',
    },
    {
      title: '높이',
      dataIndex: 'height',
      width: 50,
      align: 'center',
    },
    {
      title: '이용요금',
      dataIndex: 'priceValue',
      width: 100,
      align: 'center',
      render: (text: number) => {
        return text.toLocaleString() + '원';
      },
    },
  ];

  const unitStatisticsDatas: Array<StatisticsDatasType> = [
    {
      id: 1,
      title: '전체 룸 개수',
      value: sumNumberOfUnitItems(unitIdDatas),
    },
    {
      id: 2,
      badgeTitle: { title: '이용중', color: '#004CF8' },
      value: `${
        getNumberOfCurrentUnitStatus().using
      } / ${calculateUsingUnitRatio(
        sumNumberOfUnitItems(unitIdDatas),
        getNumberOfCurrentUnitStatus().using,
      )}%`,
    },
    {
      id: 3,
      badgeTitle: { title: '이용종료', color: '#CCCCCC' },
      value: getNumberOfCurrentUnitStatus().finish,
    },
  ];

  return (
    <PageLayout>
      <CustomHead title="룸 페이지" />
      <CustomTitle title="룸" />
      <CustomSelect data={branchDatas} id={id} />
      <CustomStatistics data={unitStatisticsDatas} />
      <CustomTable
        columns={unitTableColumns}
        data={unitIdDatas}
        pagination={false}
      />
      <CustomTable
        columns={unitItemTableColumns}
        data={filteredUnitItemDatas}
        pagination={true}
      />
    </PageLayout>
  );
};

export default Unit;
