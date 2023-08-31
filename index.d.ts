/// <reference types="react" />

import { BaseInstance } from 'react-evefyou-hooks';
import { BasicFormInstance } from 'react-evefyou-components/BasicTable';
import { BasicFormInstance as BasicFormInstance_2 } from 'react-evefyou-components/BasicForm';
import { BasicFormProps } from 'react-evefyou-components/BasicForm';
import { BasicTableInstance } from 'react-evefyou-components/BasicForm';
import { BasicTableInstance as BasicTableInstance_2 } from 'react-evefyou-components/BasicTable';
import { BasicTableProps } from 'react-evefyou-components';
import { Context } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import { FC } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { JSXElementConstructor } from 'react';
import { KeyItem } from 'react-evefyou-hooks';
import { MemoExoticComponent } from 'react';
import { MenuProps } from 'antd';
import { PropsWithChildren } from 'react';
import { default as React_2 } from 'react';
import { ReactElement } from 'react';
import { RefObject } from 'react';
import { TabsProps } from 'antd';
import { UseCompInstanceReturnType } from 'react-evefyou-hooks';
import { UsePropsReturnType } from 'react-evefyou-hooks';

export declare type AntdTabItem = Required<TabsProps>['items'][number];

export declare const BasicContainer: React_2.ForwardRefExoticComponent<{
    children?: React_2.ReactNode;
} & {
    footer: React_2.ReactNode;
} & React_2.RefAttributes<BasicContainerInstance>>;

export declare const BasicContainerContext: React_2.Context<BasicContainerContextValue>;

export declare interface BasicContainerContextValue {
    getElement: () => HTMLDivElement | null;
}

export declare interface BasicContainerInstance {
    getElement: () => HTMLDivElement | null;
}

export declare type Children = ReactElement<any, string | JSXElementConstructor<any>> | null;

export declare type CommonContainerProps = PropsWithChildren & {
    footer: React.ReactNode;
};

export declare const DEFAULT_TAB_CONTAINER_SETTING: TabContainerSetting;

declare type DefaultTabBar = Parameters<RenderTabBar>[1];

export declare const DndContextTabBar: FC<DndContextTabBarProps>;

declare interface DndContextTabBarProps extends RenderTabBarProps {
    items: AntdTabItem[];
    DefaultTabBar: DefaultTabBar;
    handleOnDragEnd: (event: DragEndEvent) => void;
    handleOnActiveBarTransform: (className: string) => void;
}

export declare const DraggableTabNode: ({ className, onActiveBarTransform, ...props }: DraggableTabPaneProps) => React_2.ReactElement<any, string | React_2.JSXElementConstructor<any>>;

declare interface DraggableTabPaneProps extends React_2.HTMLAttributes<HTMLDivElement> {
    'data-node-key': string;
    onActiveBarTransform: (className: string) => void;
}

export declare const KeepAliveComponentMemo: React_2.NamedExoticComponent<KeepAliveComponentProps>;

export declare interface KeepAliveComponentProps {
    active: boolean;
    children: Children;
    name: string;
    renderDiv: RefObject<HTMLDivElement>;
}

export declare const KeepAliveContainer: MemoExoticComponent<({ children, excludes, includes, maxLen, active, }: KeepAliveProps) => JSX_2.Element | null>;

export declare const KeepAliveContext: Context<KeepaliveContext>;

export declare interface KeepaliveContext {
    destroy: (params: string[], render?: boolean) => void;
    isActive: boolean;
}

export declare interface KeepAliveProps {
    includes?: Array<string>;
    excludes?: Array<string>;
    maxLen?: number;
    children: Children;
    active?: boolean;
}

declare type RenderTabBar = Required<TabsProps>['renderTabBar'];

declare type RenderTabBarProps = Parameters<RenderTabBar>[0];

export declare const TabBarExtraContent: FC<TabBarExtraContentProps>;

declare interface TabBarExtraContentProps {
    items: MenuProps['items'];
    onFullScreen: () => void;
    onRefresh: () => void;
    onCloseCurrentTab: () => void;
    onCloseLeftTabs: () => void;
    onCloseRightTabs: () => void;
    onCloseOtherTabs: () => void;
    onCloseAllTabs: () => void;
}

export declare interface TabBarMoreItem {
    title: string;
    icon: string;
}

export declare const TabContainer: FC<TabContainerProps>;

export declare type TabContainerProps = PropsWithChildren & {
    indexPath?: string;
    tabBarMoreItems?: TabBarMoreItem[];
    tabBarHeight?: string;
    footer?: React.ReactNode;
};

export declare interface TabContainerSetting {
    tabBarMoreItems: TabBarMoreItem[];
    indexPath: string;
}

export declare interface TabItem extends KeyItem<string> {
    label: React_2.ReactNode;
    children: React_2.ReactNode;
    closeIcon: React_2.ReactNode;
}

export declare const TableContainer: <T = any>(p: TableContainerProps<T> & {
    ref?: React_2.Ref<TableContainerInstance<any>> | undefined;
}) => ReactElement;

export declare interface TableContainerInstance<T = any> extends BaseInstance<TableContainerProps<T>> {
    formInstance: Partial<BasicFormInstance<any>>;
    tableInstance: Partial<BasicTableInstance<any>>;
    getElement: () => HTMLDivElement | null;
}

export declare type TableContainerProps<T = any> = BasicTableProps<T>;

export declare type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export declare function translate2MenuItems(tabsMenuList?: TabBarMoreItem[]): {
    key: number;
    label: JSX_2.Element;
    icon: JSX_2.Element;
}[] | undefined;

export declare const useBasicContainerContext: () => BasicContainerContextValue;

export declare function useSearchForm<T = any>(props: TableContainerProps<T>): UseCompInstanceReturnType<BasicFormProps, BasicFormInstance_2<any>>;

export declare const useTabItemsState: any;

export declare function useTable<T = any>(props: TableContainerProps<T>): UseCompInstanceReturnType<BasicTableProps<T>, BasicTableInstance_2<T>>;

export declare function useTableContainerProps<T = any>(props: TableContainerProps<T>): UsePropsReturnType<TableContainerProps<T>>;

export declare function useTableLayout(props: TableContainerProps, methods: UseTableLayoutHooksMethods): UseTableLayoutReturnType;

export declare interface UseTableLayoutHooksMethods {
    instance: TableContainerInstance;
    tableInstance: Partial<BasicTableInstance>;
}

export declare interface UseTableLayoutMethods {
    resetTableHeight: () => void;
}

export declare type UseTableLayoutReturnType = UseTableLayoutMethods;

export declare function useTabs(): {
    getTabItem: (key: string, locale: string, title?: string, children?: React_2.ReactNode) => TabItem;
};

export { }
