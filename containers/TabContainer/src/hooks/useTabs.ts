/*
 * @Author: EvefyouFE
 * @Date: 2023-08-21 00:57:46
 * @FilePath: \react-evefyou-common\components\_common\hooks\useTabs.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { CloseOutlined } from "@ant-design/icons";
import React, { Fragment, useMemo } from "react";
import { KeyItem } from "react-evefyou-hooks";
import { FormattedMessage } from "react-intl";

export interface TabItem extends KeyItem<string> {
  label: React.ReactNode;
  children: React.ReactNode;
  closeIcon: React.ReactNode
}

export function useTabs() {
  function getTabItem(key: string, locale: string, title?: string, children?: React.ReactNode): TabItem {
    return {
      key,
      label: React.createElement(Fragment, {}, [
        React.createElement(FormattedMessage, { id: locale, key }),
        title
      ]),
      closeIcon: React.createElement(CloseOutlined),
      children
    }
  }

  return useMemo(() => ({
    getTabItem,
  }), [])
}