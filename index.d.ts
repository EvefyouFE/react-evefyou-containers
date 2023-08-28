import { BaseInstance } from 'react-evefyou-hooks';
import { BasicFormInstance } from 'react-evefyou-components';
import { BasicTableInstance } from 'react-evefyou-components';
import { BasicTableProps } from 'react-evefyou-components';
import { Context } from 'react';
import { FC } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { JSXElementConstructor } from 'react';
import { MemoExoticComponent } from 'react';
import { MessageDescriptor } from 'react-intl';
import { PrimitiveType } from 'react-intl';
import { PropsWithChildren } from 'react';
import { default as React_2 } from 'react';
import { ReactElement } from 'react';
import { RefObject } from 'react';

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

declare type ContainersFormatXMLElementFn<T, R = string | T | (string | T)[]> = (parts: Array<string | T>) => R;

declare type ContainersId = keyof typeof _default;

declare interface ContainersProps extends MessageDescriptor {
    id: ContainersId;
    values?: ContainersValues;
}

declare type ContainersValues = Record<string, React_2.ReactNode | PrimitiveType | ContainersFormatXMLElementFn<React_2.ReactNode, React_2.ReactNode>>;

declare const _default: {
    'container.page.menu.reload': string;
    'container.page.menu.close': string;
    'container.page.menu.close.left': string;
    'container.page.menu.close.right': string;
    'container.page.menu.close.other': string;
    'container.page.menu.close.all': string;
};

export declare const DEFAULT_TAB_CONTAINER_SETTING: TabContainerSetting;

export declare function formatContainersById(id: ContainersId, values?: ContainersValues): React_2.ReactNode;

export declare function formatContainersMessage({ id, values }: ContainersProps): React_2.ReactNode;

declare type FormatMessageProps = (descriptor: ContainersProps, values?: ContainersValues) => string;

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

export declare const TableContainer: <T = any>(p: TableContainerProps<T> & {
    ref?: React_2.Ref<TableContainerInstance<any>> | undefined;
}) => ReactElement;

export declare interface TableContainerInstance<T = any> extends BaseInstance<TableContainerProps<T>> {
    formInstance: Partial<BasicFormInstance<any>>;
    tableInstance: Partial<BasicTableInstance<any>>;
    getElement: () => HTMLDivElement | null;
}

export declare type TableContainerProps<T = any> = BasicTableProps<T>;

export declare function translate2MenuItems(tabsMenuList?: TabBarMoreItem[]): {
    key: number;
    label: JSX_2.Element;
    icon: JSX_2.Element;
}[] | undefined;

export declare const useBasicContainerContext: () => BasicContainerContextValue;

export declare const useContainersLocale: () => {
    formatMessage: FormatMessageProps;
    formatById: (id: ContainersId, values?: ContainersValues) => string;
};

export declare interface UseTableLayoutHooksMethods {
    instance: TableContainerInstance;
    tableInstance: Partial<BasicTableInstance>;
}

export declare interface UseTableLayoutMethods {
    resetTableHeight: () => void;
}

export declare type UseTableLayoutReturnType = UseTableLayoutMethods;

export { }
