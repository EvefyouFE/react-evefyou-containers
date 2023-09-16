import { useCompInstance } from "react-evefyou-hooks/useCompInstance";
import { TableContainerInstance } from "../typing";
import { TableContainerProps } from "../props";

export function useTableContainerInstance<T = any, FT = any>(
  props?: TableContainerProps<T, FT>
): [React.MutableRefObject<TableContainerInstance<T, FT> | null>, Partial<TableContainerInstance<T, FT>>] {
  return useCompInstance<TableContainerInstance<T, FT>>(props)
}