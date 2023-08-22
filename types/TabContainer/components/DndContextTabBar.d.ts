import type { DragEndEvent } from '@dnd-kit/core';
import { TabsProps } from 'antd';
import { FC } from 'react';
import { TabItem } from '../typing';
type RenderTabBar = Required<TabsProps>['renderTabBar'];
type RenderTabBarProps = Parameters<RenderTabBar>[0];
type DefaultTabBar = Parameters<RenderTabBar>[1];
interface DndContextTabBarProps extends RenderTabBarProps {
    items: TabItem[];
    DefaultTabBar: DefaultTabBar;
    handleOnDragEnd: (event: DragEndEvent) => void;
    handleOnActiveBarTransform: (className: string) => void;
}
export declare const DndContextTabBar: FC<DndContextTabBarProps>;
export {};
