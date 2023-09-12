import { PropsWithChildren } from "react";
import { TabsBarMoreItem } from "./typing";

export type TabsContainerProps = PropsWithChildren & {
  indexPath?: string;
  tabBarMoreItems?: TabsBarMoreItem[];
  tabBarHeight?: string;
  footer?: React.ReactNode;
}