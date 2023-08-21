/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:31
 * @FilePath: \react-evefyou-admin\src\components\Containers\TableContainer\src\hooks\useTable.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { useCompInstance } from "react-evefyou-hooks";
import { BasicTableInstance } from "react-evefyou-components";
import { TableContainerProps } from "../props";

export function useTable<T = any>(props: TableContainerProps<T>) {
    return useCompInstance<BasicTableInstance<T>>(props)
}