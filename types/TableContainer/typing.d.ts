import { BaseInstance } from "react-evefyou-hooks";
import { BasicTableInstance, BasicFormInstance } from "react-evefyou-components";
import { TableContainerProps } from "./props";
export interface TableContainerInstance<T = any> extends BaseInstance<TableContainerProps<T>> {
    formInstance: Partial<BasicFormInstance<any>>;
    tableInstance: Partial<BasicTableInstance<any>>;
    getElement: () => HTMLDivElement | null;
}
export interface UseTableLayoutHooksMethods {
    instance: TableContainerInstance;
    tableInstance: Partial<BasicTableInstance>;
}
export interface UseTableLayoutMethods {
    resetTableHeight: () => void;
}
export type UseTableLayoutReturnType = UseTableLayoutMethods;
