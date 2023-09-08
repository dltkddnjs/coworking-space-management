import { Descriptions, Select, Space, Typography } from 'antd';
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
    <Descriptions>
      <Descriptions.Item
        label="지점"
        labelStyle={{ fontSize: '25px', color: '#000000' }}
      >
        <Select
          defaultValue={selectableOptions[Number(id) - 1]}
          style={{
            width: '100%',
          }}
          onChange={() => setCurrentPage(1)}
          options={selectableOptions}
          size="large"
          onSelect={(option) => {
            router.push(`/unit/${option}`);
            setCurrentPage(1);
          }}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};

export default CustomSelect;
