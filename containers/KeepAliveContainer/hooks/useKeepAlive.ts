import { useContext } from "react";
import { KeepAliveContext } from "../context";

export function useKeepAliveSetting() {
    const context = useContext(KeepAliveContext)
    return {
        ...context
    }
}