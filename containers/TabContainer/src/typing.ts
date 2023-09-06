export type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
export interface TabBarMoreItem {
  title: string;
  icon: string;
}
export interface TabContainerSetting {
  tabBarMoreItems: TabBarMoreItem[];
  indexPath: string;
}