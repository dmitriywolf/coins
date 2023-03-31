import {
  DeleteTwoTone,
  getTwoToneColor,
  setTwoToneColor,
} from '@ant-design/icons';
import { Button, Image, theme, Tooltip } from 'antd';

import { useCompareContext } from '@/context';

import classes from './styles.module.scss';

const { useToken } = theme;

export default function CompareItem({ id, name, image, internal, isGraph }) {
  const { removeCoin } = useCompareContext();

  const removeFromCompareHandler = () => {
    if (isGraph) {
      removeCoin({ coin: { id }, isGraph });
    } else {
      removeCoin({ coin: { internal }, isGraph: false });
    }
  };

  const {
    token: { colorPrimary },
  } = useToken();

  setTwoToneColor(colorPrimary);

  return (
    <div className={classes.card}>
      <div className={classes.titleWrap}>
        <Image src={image} alt={name} preview={false} />
        <h3 className={classes.title}>{name}</h3>
      </div>

      <Tooltip title='Remove Coin'>
        <Button
          shape='circle'
          style={{
            backgroundColor: 'transparent',
            border: 'none',
          }}
          icon={<DeleteTwoTone />}
          twoToneColor={getTwoToneColor()}
          onClick={removeFromCompareHandler}
        />
      </Tooltip>
    </div>
  );
}
