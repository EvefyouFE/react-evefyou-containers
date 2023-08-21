/*
 * @Author: EvefyouFE
 * @Date: 2023-08-21 22:40:46
 * @FilePath: \react-evefyou-containers\components\BasicContainer\index.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import classNames from 'classnames';
import { useDesign } from 'react-evefyou-components';
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import './BasicContainer.less';
import { CommonContainerProps } from "./props";

export interface BasicContainerInstance {
  getElement: () => HTMLDivElement | null;
}
export interface BasicContainerContextValue {
  getElement: () => HTMLDivElement | null;
}
const DEFAULT_COMMON_CONTAINER_VALUE: BasicContainerContextValue = {
  getElement: () => null,
};
export const BasicContainerContext = React.createContext(
  DEFAULT_COMMON_CONTAINER_VALUE,
);
// eslint-disable-next-line react-refresh/only-export-components
export const useBasicContainerContext = () =>
  React.useContext(BasicContainerContext);

export const BasicContainer = forwardRef<
  BasicContainerInstance,
  CommonContainerProps
>(({ children, footer }, ref) => {
  const { prefixCls } = useDesign('basic-container');
  const rootClsName = classNames(prefixCls, 'h-full bg-slate-100');
  const containerRef = useRef<HTMLDivElement>(null);
  const value = useMemo(
    () => ({
      getElement: () => containerRef.current,
    }),
    [],
  );
  useImperativeHandle(ref, () => value);
  return (
    <div className={rootClsName} ref={containerRef}>
      <div className={prefixCls.concat('-content')}>
        <BasicContainerContext.Provider value={value}>
          {children}
        </BasicContainerContext.Provider>
      </div>
      {footer}
    </div>
  );
});

BasicContainer.displayName = 'BasicContainer';
