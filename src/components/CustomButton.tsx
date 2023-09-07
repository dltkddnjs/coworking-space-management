import { Button } from 'antd';

const CustomButton = ({ buttonTitle }: CustomButtonProps) => {
  return (
    <Button type="primary" onClick={() => console.log(buttonTitle)}>
      {buttonTitle}
    </Button>
  );
};

export default CustomButton;
