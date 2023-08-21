/*
 * @Author: EvefyouFE
 * @Date: 2023-08-22 00:12:19
 * @FilePath: \react-evefyou-containers\components\KeepAliveContainer\context\index.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { createContext } from "react";

export interface KeepaliveContext {
  destroy: (params: string[], render?: boolean) => void;
  isActive: boolean;
}
export const KeepAliveContext = createContext<KeepaliveContext>({
  destroy: () => { },
  isActive: false,
});