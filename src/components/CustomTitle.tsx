import { Typography } from 'antd';

const { Title } = Typography;

const CustomTitle = ({ title }: CustomTitleProps) => {
  return (
    <Title level={2} style={{ margin: '0' }}>
      {title}
    </Title>
  );
};

export default CustomTitle;
