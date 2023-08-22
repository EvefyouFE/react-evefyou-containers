/// <reference types="react" />
export interface KeepaliveContext {
    destroy: (params: string[], render?: boolean) => void;
    isActive: boolean;
}
export declare const KeepAliveContext: import("react").Context<KeepaliveContext>;
