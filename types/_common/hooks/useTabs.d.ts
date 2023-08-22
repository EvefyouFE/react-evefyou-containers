import React from "react";
import { KeyItem } from "react-evefyou-hooks";
export interface TabItem extends KeyItem<string> {
    label: React.ReactNode;
    children: React.ReactNode;
    closeIcon: React.ReactNode;
}
export declare function useTabs(): {
    getTabItem: (key: string, locale: string, title?: string, children?: React.ReactNode) => TabItem;
};
