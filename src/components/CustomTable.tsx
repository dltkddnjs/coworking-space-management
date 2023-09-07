import { Card, Pagination, Table } from 'antd';
import { useRef, useState } from 'react';
import CustomButton from './CustomButton';

const CustomTable = ({
  columns,
  data,
  pagination,
  buttonTitle,
}: CustomTableProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const currentDataSource = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  ); // props로 받아온 데이터들을 현재 페이지에 보여질 pageSize만큼 나누어준다

  const scrollRef = useRef<HTMLDivElement>(null);

  const setScrollAboveTheTable = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
    }
  }; // Pagination의 currentPage 혹은 pageSize가 바뀌면 스크롤 위치가 Table 바로 위로 자동으로 옮겨져 사용자경험 개선

  return (
    <Card bordered={false} ref={scrollRef}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: '20px',
        }}
      >
        <CustomButton buttonTitle={buttonTitle} />
      </div>
      <Table
        columns={columns}
        dataSource={currentDataSource}
        pagination={false}
        bordered
        rowKey={(data) => data.id}
        size="small"
      />
      {pagination && (
        <Pagination
          current={currentPage}
          total={data.length}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} / 총 ${total}건`
          }
          defaultPageSize={10}
          defaultCurrent={1}
          pageSize={pageSize}
          pageSizeOptions={[10, 20, 50, 100]}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
            setScrollAboveTheTable();
          }}
          onShowSizeChange={() => setScrollAboveTheTable()}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
          }}
        />
      )}
    </Card>
  );
};

export default CustomTable;
