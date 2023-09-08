import { Statistic, Col, Row, Card, Badge } from 'antd';

const CustomStatistics = ({ data }: CustomStatisticsProps) => {
  return (
    <Card>
      <Row gutter={24}>
        {data.map((item: StatisticsDatasType) => (
          <Col span={4} key={item.id} style={{ minWidth: 'fit-content' }}>
            <Statistic
              title={
                item.title ? (
                  item.title
                ) : (
                  <Badge
                    color={item.badgeTitle && item.badgeTitle.color}
                    text={item.badgeTitle && item.badgeTitle.title}
                  />
                )
              }
              value={item.value}
            />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default CustomStatistics;
