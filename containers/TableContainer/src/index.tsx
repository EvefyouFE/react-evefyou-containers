/*
 * @Author: EvefyouFE
 * @Date: 2023-08-21 22:40:46
 * @FilePath: \react-evefyou-containers\components\TableContainer\index.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:31
 * @FilePath: \react-evefyou-containers\components\TableContainer\index.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import 'virtual:windi.css'
import React, {
  ReactElement,
  Ref,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { BasicForm, BasicTable } from 'react-evefyou-components';
import { deepCompareObj } from 'react-evefyou-common';
import { useDesign } from 'react-evefyou-hooks';
import classNames from 'classnames';
import { TableContainerInstance } from './typing';
import {
  useSearchForm,
  useTable,
  useTableContainerProps,
  useTableLayout,
} from './hooks';
import { TableContainerProps } from './props';

export const TableContainer = React.memo(
  React.forwardRef(
    <T = any>(
      props: TableContainerProps<T>,
      ref: React.ForwardedRef<TableContainerInstance<T>>,
    ) => {
      const tableContainerRef = useRef<HTMLDivElement>(null);
      const [propsState, propsMethods] = useTableContainerProps<T>(props);
      const [formInstanceRef, formInstance] = useSearchForm(propsState);
      const [tableInstanceRef, tableInstance] = useTable<T>(propsState);

      const instance: TableContainerInstance = useMemo(
        () => ({
          init: propsMethods.init,
          getElement: () => tableContainerRef.current,
          formInstance,
          tableInstance,
        }),
        [propsMethods.init, formInstance, tableInstance],
      );
      useImperativeHandle(ref, () => instance, [instance]);

      useTableLayout(propsState, {
        instance,
        tableInstance,
      });

      const { prefixCls } = useDesign('table-container');
      const rootClsName = classNames(prefixCls, 'p-4');
      return (
        <div className={rootClsName} ref={tableContainerRef}>
          <BasicForm ref={formInstanceRef} />
          <BasicTable<T> ref={tableInstanceRef} />
        </div>
      );
    },
  ),
  deepCompareObj,
) as <T = any>(
  p: TableContainerProps<T> & { ref?: Ref<TableContainerInstance> },
) => ReactElement;
