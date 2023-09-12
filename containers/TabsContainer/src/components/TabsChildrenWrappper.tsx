import { BasicContainer, BasicContainerInstance, BasicContainerProps } from "@/BasicContainer";
import React from "react";
import { useDesign } from "react-evefyou-hooks/useDesign";

export const TabsChildrenWrapper = React.forwardRef(
  (
    {
      children,
      footer
    }: BasicContainerProps,
    ref: React.ForwardedRef<BasicContainerInstance>,
  ) => {
    const { prefixCls } = useDesign('tabs-container-wrapper');
    return <BasicContainer className={prefixCls} ref={ref} footer={footer}>{children}</BasicContainer>
  },
);
TabsChildrenWrapper.displayName = 'TabsChildrenWrapper';