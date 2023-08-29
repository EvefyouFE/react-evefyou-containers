import { TabsProps } from "antd";

export type AntdTabItem = Required<TabsProps>['items'][number];
export type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
export interface TabBarMoreItem {
  title: string;
  icon: string;
}
export interface TabContainerSetting {
  tabBarMoreItems: TabBarMoreItem[];
  indexPath: string;
}