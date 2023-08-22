import { MenuProps } from 'antd';
import { FC } from 'react';
interface TabBarExtraContentProps {
    items: MenuProps['items'];
    onFullScreen: () => void;
    onRefresh: () => void;
    onCloseCurrentTab: () => void;
    onCloseLeftTabs: () => void;
    onCloseRightTabs: () => void;
    onCloseOtherTabs: () => void;
    onCloseAllTabs: () => void;
}
export declare const TabBarExtraContent: FC<TabBarExtraContentProps>;
export {};
