import { FC } from 'react';
import { TabContainerProps } from "./props";
import { TabBarMoreItem } from '../types/global';
export declare function translate2MenuItems(tabsMenuList?: TabBarMoreItem[]): {
    key: number;
    label: import("react/jsx-runtime").JSX.Element;
    icon: import("react/jsx-runtime").JSX.Element;
}[] | undefined;
export declare const TabContainer: FC<TabContainerProps>;
