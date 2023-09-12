/*
 * @Author: EvefyouFE
 * @Date: 2023-08-22 00:11:21
 * @FilePath: \react-evefyou-containers\components\KeepAliveContainer\index.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { useUpdate } from 'ahooks';
import { equals, filter, findIndex, isNil, map, propEq } from 'ramda';
import { memo, useMemo, useRef } from 'react';
import { useLocation } from 'react-router';
import {
  KeepAliveComponentMemo as KeepAliveComponent,
} from './components/KeepAliveComponent';
import { KeepAliveContext } from "./context";
import { KeepAliveProps, Children } from "./props";
import { useDesign } from "react-evefyou-hooks/useDesign";

export const KeepAliveContainer = memo(({
  children,
  excludes,
  includes,
  maxLen = 5,
  active = true,
}: KeepAliveProps) => {
  const { prefixCls } = useDesign('keep-alive-container')
  const containerRef = useRef<HTMLDivElement>(null);
  const components = useRef<Array<{ name: string; ele: Children }>>([]);
  const { pathname } = useLocation();
  const update = useUpdate();

  // 如果没有配置include，exclude 则不缓存
  if (isNil(excludes) && isNil(includes)) {
    components.current = [
      {
        name: pathname,
        ele: children,
      },
    ];
  } else {
    // 缓存超过上限的 干掉第一个缓存
    if (components.current.length >= maxLen) {
      components.current = components.current.slice(1);
    }
    components.current = filter(({ name }) => {
      if (excludes && excludes.includes(name)) {
        return false;
      }
      if (includes) {
        return includes.includes(name);
      }
      return true;
    }, components.current);
    const component = components.current.find((res) =>
      equals(res.name, pathname),
    );
    if (isNil(component)) {
      components.current = [
        ...components.current,
        {
          name: pathname,
          ele: children,
        },
      ];
    }
  }

  const activeIndex = findIndex(propEq('name', pathname))(components.current);
  const context = useMemo(() => {
    // 销毁缓存的路由
    function destroy(params: string[], render = false) {
      components.current = filter(({ name }) => {
        if (params.includes(name)) {
          return false;
        }
        return true;
      }, components.current);
      // 是否需要立即刷新 一般是不需要的
      if (render) {
        update();
      }
    }
    return {
      destroy,
      isActive: activeIndex !== -1,
    };
  }, [activeIndex, update]);

  if (!active) return children;
  return (
    <>
      <div ref={containerRef} className={prefixCls} />
      <KeepAliveContext.Provider value={context}>
        {map(
          ({ name, ele }) => (
            <KeepAliveComponent
              active={equals(name, pathname)}
              renderDiv={containerRef}
              name={name}
              key={name}
            >
              {ele}
            </KeepAliveComponent>
          ),
          components.current,
        )}
      </KeepAliveContext.Provider>
    </>
  );
});
