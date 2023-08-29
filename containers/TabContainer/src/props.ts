import { PropsWithChildren } from "react";
import { TabBarMoreItem } from "./typing";

export type TabContainerProps = PropsWithChildren & {
  indexPath?: string;
  tabBarMoreItems?: TabBarMoreItem[];
  tabBarHeight?: string;
  footer?: React.ReactNode;
}