import { useProps } from "react-evefyou-hooks/useProps";
import { TableContainerProps } from "../props";
import { UsePropsReturnType } from "react-evefyou-hooks";
import { Recordable } from "react-evefyou-common";

export function useTableContainerProps<T extends Recordable = any, FT = any>(
    props: TableContainerProps<T, FT>
): UsePropsReturnType<TableContainerProps<T, FT>> {
    return useProps(props)
}