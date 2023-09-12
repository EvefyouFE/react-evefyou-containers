import 'virtual:windi.css'
import {
  DownOutlined,
  FullscreenOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import { FC } from 'react';

interface TabsBarExtraContentProps {
  items: MenuProps['items'];
  onFullScreen: () => void;
  onRefresh: () => void;
  onCloseCurrentTab: () => void;
  onCloseLeftTabs: () => void;
  onCloseRightTabs: () => void;
  onCloseOtherTabs: () => void;
  onCloseAllTabs: () => void;
}

export const TabsBarExtraContent: FC<TabsBarExtraContentProps> = ({
  items,
  onFullScreen,
  onRefresh,
  onCloseAllTabs,
  onCloseCurrentTab,
  onCloseLeftTabs,
  onCloseOtherTabs,
  onCloseRightTabs,
}) => {
  const itemClassName =
    'w-8 h-full flex justify-center items-center border border-solid border-neutral-300 hover:text-primary';
  return (
    <div className="flex h-full cursor-pointer">
      <span className={itemClassName} onClick={onRefresh}>
        <RedoOutlined />
      </span>
      <span className={itemClassName}>
        <Dropdown
          menu={{
            items,
            onClick: (e) => {
              switch (e.key) {
                case '0':
                  onRefresh();
                  break;
                case '1':
                  onCloseCurrentTab();
                  break;
                case '2':
                  onCloseLeftTabs();
                  break;
                case '3':
                  onCloseRightTabs();
                  break;
                case '4':
                  onCloseOtherTabs();
                  break;
                case '5':
                default:
                  onCloseAllTabs();
                  break;
              }
            },
          }}
        >
          <DownOutlined />
        </Dropdown>
      </span>
      <span className={itemClassName} onClick={onFullScreen}>
        <FullscreenOutlined />
      </span>
    </div>
  );
};
