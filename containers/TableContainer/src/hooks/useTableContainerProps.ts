import { useProps } from "react-evefyou-hooks/useProps";
import { TableContainerProps } from "../props";
import { UsePropsReturnType } from "react-evefyou-hooks";

export function useTableContainerProps<T = any, FT = any>(
    props: TableContainerProps<T, FT>
): UsePropsReturnType<TableContainerProps<T, FT>> {
    return useProps(props)
}