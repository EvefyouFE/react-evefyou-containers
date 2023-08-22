import React, { ReactElement, Ref } from 'react';
import { TableContainerInstance } from './typing';
import { TableContainerProps } from './props';
export declare const TableContainer: <T = any>(p: TableContainerProps<T> & {
    ref?: React.Ref<TableContainerInstance<any>> | undefined;
}) => ReactElement;
