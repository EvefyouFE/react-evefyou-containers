export type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
export interface TabsBarMoreItem {
  title: string;
  icon: string;
}
export interface TabsContainerSetting {
  tabBarMoreItems: TabsBarMoreItem[];
  indexPath: string;
}