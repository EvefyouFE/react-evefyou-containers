import { useProps } from "react-evefyou-hooks/useProps";
import { TableContainerProps } from "../props";
import { UsePropsReturnType } from "react-evefyou-hooks";

export function useTableContainerProps<T = any>(
    props: TableContainerProps<T>
): UsePropsReturnType<TableContainerProps<T>> {
    return useProps(props)
}