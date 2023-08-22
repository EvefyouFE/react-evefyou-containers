import React from 'react';
interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
    'data-node-key': string;
    onActiveBarTransform: (className: string) => void;
}
export declare const DraggableTabNode: ({ className, onActiveBarTransform, ...props }: DraggableTabPaneProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export {};
