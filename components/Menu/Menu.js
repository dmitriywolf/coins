import { Menu as AntMenu } from 'antd';
import { useRouter } from 'next/router';

const items = [
  { label: 'Coins', to: 'coins', key: '/coins' },
  { label: 'Profile', to: 'profile', key: '/profile' },
];

export const Menu = () => {
  const router = useRouter();

  const onMenuClickHandler = (e) => {
    router.push(e.key);
  };

  return (
    <AntMenu
      onClick={onMenuClickHandler}
      mode='horizontal'
      items={items}
      style={{ minWidth: 0, flex: 'auto' }}
    />
  );
};
