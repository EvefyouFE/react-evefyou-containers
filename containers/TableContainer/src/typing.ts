/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:31
 * @FilePath: \react-evefyou-admin\src\components\Containers\TableContainer\src\typing.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { BaseInstance } from "react-evefyou-hooks";
import { BasicFormInstance } from "react-evefyou-components/BasicForm";
import { BasicTableInstance } from "react-evefyou-components/BasicTable";
import { TableContainerProps } from "./props";
import { Recordable } from "react-evefyou-common";

export interface TableContainerInstance<T extends Recordable = any, FT = any> extends BaseInstance<TableContainerProps<T, FT>> {
  formInstance: Partial<BasicFormInstance<FT>>;
  tableInstance: Partial<BasicTableInstance<T>>;
  getElement: () => HTMLDivElement | null;
}

export interface UseTableLayoutHooksMethods<T extends Recordable = any, FT = any> {
  instance: TableContainerInstance<T, FT>;
  tableInstance: Partial<BasicTableInstance<T>>;
}
export interface UseTableLayoutMethods {
  resetTableHeight: () => void;
}
export type UseTableLayoutReturnType = UseTableLayoutMethods