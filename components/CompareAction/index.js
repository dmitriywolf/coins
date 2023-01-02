import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useCompareContext } from 'context';

export function CompareAction({ row: coin, isGraph }) {
  const { addCoin, removeCoin, coinExist } = useCompareContext();

  const addToCompareHandler = (event) => {
    event.stopPropagation();
    addCoin({ coin, isGraph });
  };

  const removeFromCompareHandler = (event) => {
    event.stopPropagation();
    removeCoin({ coin, isGraph });
  };

  return (
    <>
      {coinExist({ coin, isGraph }) ? (
        <Button
          shape='round'
          icon={<MinusCircleOutlined />}
          onClick={removeFromCompareHandler}
          danger
        >
          Compare
        </Button>
      ) : (
        <Button
          type='primary'
          shape='round'
          icon={<PlusCircleOutlined />}
          onClick={addToCompareHandler}
        >
          Compare
        </Button>
      )}
    </>
  );
}
