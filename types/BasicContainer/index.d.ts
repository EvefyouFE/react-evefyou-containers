import React from 'react';
export interface BasicContainerInstance {
    getElement: () => HTMLDivElement | null;
}
export interface BasicContainerContextValue {
    getElement: () => HTMLDivElement | null;
}
export declare const BasicContainerContext: React.Context<BasicContainerContextValue>;
export declare const useBasicContainerContext: () => BasicContainerContextValue;
export declare const BasicContainer: React.ForwardRefExoticComponent<{
    children?: React.ReactNode;
} & {
    footer: React.ReactNode;
} & React.RefAttributes<BasicContainerInstance>>;
