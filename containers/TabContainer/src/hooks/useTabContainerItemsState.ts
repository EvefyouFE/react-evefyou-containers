/*
 * @Author: EvefyouFE
 * @Date: 2023-08-07 01:04:36
 * @FilePath: \react-evefyou-containers\components\TabContainer\hooks\useTabItemsState.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { defineActiveItemsState } from "react-evefyou-hooks/useActiveItemsState";
import { defineUseState } from "react-evefyou-hooks/defineUseState";
import { AntdTabItem } from 'react-evefyou-components'

const useActiveItemsState = defineActiveItemsState<AntdTabItem>()

export const useTabContainerItemsState = defineUseState({
  name: 'useTabContainerItemsState',
  useState: () => useActiveItemsState(),
  getters: {
    getViewTabItems(state) {
      const items = state.itemsState
      if (items.length === 1) {
        items[0].closable = false;
      } else if (items.length > 1) {
        items[0].closable = true;
      }
      return items
    }
  }
})
