import { Select, Space, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const { Title } = Typography;

const CustomSelect = ({ data, id }: CustomSelectProps) => {
  const [, setCurrentPage] = useState<number>(1);
  const router = useRouter();

  const selectableOptions = data.map((data: BranchDataType) => ({
    value: data.id,
    label: data.branchName,
  })); // props로 받아온 데이터들의 id와 branchName의 값들을 추출하여 변수에 담은 후 Select 컴포넌트의 옵션들로 설정해준다.

  return (
    <Space wrap>
      <Title level={2} style={{ margin: '0' }}>
        지점 :
      </Title>
      <Select
        defaultValue={selectableOptions[Number(id) - 1].label}
        style={{
          width: '1426px',
        }}
        onChange={() => setCurrentPage((prev) => (prev = 1))}
        options={selectableOptions}
        size="large"
        onSelect={(option) => router.push(`/unit/${option}`)}
      />
    </Space>
  );
};

export default CustomSelect;
