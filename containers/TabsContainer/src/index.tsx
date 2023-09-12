/*
 * @Author: EvefyouFE
 * @Date: 2023-08-20 23:36:49
 * @FilePath: \react-evefyou-containers\containers\TabContainer\index.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import 'virtual:windi.css'
import { useFullscreen } from 'ahooks';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Tabs, TabsProps } from 'antd';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BasicIcon } from 'react-evefyou-components/BasicIcon';
import { FormattedMessage } from "react-intl";
import { useLocation, useNavigate } from 'react-router';
import { DndContextTabBar } from './components/DndContextTabBar';
import './TabsContainer.less';
import { TabsBarExtraContent } from './components/TabsBarExtraContent';
import {
  BasicContainerInstance,
} from '@/BasicContainer';
import { useDesign } from 'react-evefyou-hooks/useDesign';
import { uuid } from 'react-evefyou-common/utils/generate/uuid';
import { useTabsContainerItemsState } from './hooks/useTabsContainerItemsState';
import { TabsContainerProps } from "./props";
import { DEFAULT_TABS_CONTAINER_SETTING } from "./setting/tabsContainerSetting";
import { TabsBarMoreItem } from "./typing";
import { formatBaseById } from "react-evefyou-common";
import classNames from "classnames";
import { TabsChildrenWrapper } from "./components/TabsChildrenWrappper";

// eslint-disable-next-line react-refresh/only-export-components
export function translate2MenuItems(tabsMenuList?: TabsBarMoreItem[]) {
  return tabsMenuList?.map((m, index) => ({
    key: index,
    label: <FormattedMessage id={m.title} />,
    icon: <BasicIcon icon={m.icon} />,
  }));
}



export const TabsContainer: FC<TabsContainerProps> = ({
  children,
  indexPath = DEFAULT_TABS_CONTAINER_SETTING.indexPath,
  tabBarMoreItems = DEFAULT_TABS_CONTAINER_SETTING.tabBarMoreItems,
  footer,
  tabBarHeight
}) => {
  const [
    { activeKeyState },
    {
      itemsState: { set: setItems },
      addOrUpdateAndActive,
      active,
      removeByKey,
      clear,
      removeLeft,
      removeOther,
      removeRight,
      getViewTabItems,
    },
  ] = useTabsContainerItemsState();
  const itemsState = getViewTabItems();
  const newTabIndex = useRef(0);
  const location = useLocation();
  const [className, setClassName] = useState('');
  const { prefixCls } = useDesign('tabs-container');
  const containerRef = useRef<BasicContainerInstance>(null);
  const [, { toggleFullscreen }] = useFullscreen(getContainerElement);
  const navigate = useNavigate();
  const onEdit = useCallback(
    (
      targetKey: React.MouseEvent | React.KeyboardEvent | string,
      action: 'add' | 'remove',
    ) => {
      if (action === 'add') {
        const newItem = {
          label: 'New Tab',
          children: 'Content of new Tab',
          key: `newTab${(newTabIndex.current += 1)}`,
        };
        addOrUpdateAndActive(newItem);
      } else {
        removeByKey(targetKey as string);
      }
    },
    [addOrUpdateAndActive, removeByKey],
  );
  const [childrenKeyState, setChildrenKeyState] = useState('');
  const onChange = useCallback(
    (activeKey: string) => {
      active(activeKey);
      activeKey &&
        !activeKey.startsWith('newTab') &&
        activeKey !== location.pathname &&
        navigate(activeKey);
    },
    [active, location.pathname, navigate],
  );

  const wrapChildren = useMemo(
    () => (
      <TabsChildrenWrapper ref={containerRef} key={childrenKeyState} footer={footer}>
        {children}
      </TabsChildrenWrapper>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childrenKeyState],
  );
  useEffect(() => {
    const path =
      location.pathname === '/' ? indexPath : location.pathname;
    const locale = 'menu'.concat(path.replaceAll('/', '.'));
    const pathItem = {
      key: path,
      label: formatBaseById(locale),
      children: wrapChildren,
      forceRender: true,
    };
    addOrUpdateAndActive(pathItem);
  }, [
    location.pathname,
    indexPath,
    wrapChildren,
    addOrUpdateAndActive,
  ]);

  const useRenderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => {
    const handleOnDragEnd = useCallback(
      ({ active: activeItem, over }: DragEndEvent) => {
        if (activeItem.id !== over?.id) {
          setItems((prev) => {
            const activeIndex = prev.findIndex((i) => i.key === activeItem.id);
            const overIndex = prev.findIndex((i) => i.key === over?.id);
            return arrayMove(prev, activeIndex, overIndex);
          });
        }
      },
      [],
    );
    const handleOnActiveBarTransform = useCallback((cls: string) => {
      setClassName(cls);
    }, []);
    return (
      <DndContextTabBar
        items={itemsState}
        DefaultTabBar={DefaultTabBar}
        handleOnDragEnd={handleOnDragEnd}
        handleOnActiveBarTransform={handleOnActiveBarTransform}
        {...props}
      />
    );
  };
  const tabBarExtraContentItems = useMemo(
    () => translate2MenuItems(tabBarMoreItems),
    [tabBarMoreItems],
  );
  const tabBarExtraContentPropsValue = {
    items: tabBarExtraContentItems,
    onFullScreen,
    onRefresh,
    onCloseAllTabs,
    onCloseCurrentTab,
    onCloseLeftTabs,
    onCloseOtherTabs,
    onCloseRightTabs,
  };
  const tabBarExtraContent = (
    <TabsBarExtraContent {...tabBarExtraContentPropsValue} />
  );

  function onFullScreen() {
    toggleFullscreen();
  }
  function onRefresh() {
    setChildrenKeyState(uuid());
  }
  function onCloseAllTabs() {
    clear();
  }
  function onCloseCurrentTab() {
    activeKeyState && removeByKey(activeKeyState);
  }
  function onCloseLeftTabs() {
    activeKeyState && removeLeft(activeKeyState);
  }
  function onCloseOtherTabs() {
    activeKeyState && removeOther(activeKeyState);
  }
  function onCloseRightTabs() {
    activeKeyState && removeRight(activeKeyState);
  }
  function getContainerElement() {
    return containerRef.current?.getElement();
  }
  const clsName = classNames(prefixCls, className, 'h-full')
  return (
    <Tabs
      tabBarStyle={{
        height: tabBarHeight,
      }}
      className={clsName}
      size="small"
      onChange={onChange}
      activeKey={activeKeyState as string}
      type="editable-card"
      onEdit={onEdit}
      items={itemsState}
      renderTabBar={useRenderTabBar}
      tabBarExtraContent={tabBarExtraContent}
      destroyInactiveTabPane
      animated={{
        inkBar: true,
        tabPane: true,
      }}
    />
  );
};
