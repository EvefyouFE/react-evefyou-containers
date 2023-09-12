/*
 * @Author: EvefyouFE
 * @Date: 2023-08-21 22:29:44
 * @FilePath: \react-evefyou-containers\containers\_common\config\tabContainerSetting.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { TabsContainerSetting } from "../typing";

export const DEFAULT_TABS_CONTAINER_SETTING: TabsContainerSetting = {
  indexPath: '/dashboard',
  tabBarMoreItems: [
    {
      title: 'container.page.menu.reload',
      icon: 'ant-icon:ReloadOutlined',
    },
    {
      title: 'container.page.menu.close',
      icon: 'ant-icon:CloseOutlined',
    },
    {
      title: 'container.page.menu.close.left',
      icon: 'ant-icon:DoubleLeftOutlined',
    },
    {
      title: 'container.page.menu.close.right',
      icon: 'ant-icon:DoubleRightOutlined',
    },
    {
      title: 'container.page.menu.close.other',
      icon: 'ant-icon:SwapOutlined',
    },
    {
      title: 'container.page.menu.close.all',
      icon: 'ant-icon:MinusOutlined',
    },
  ],
}
