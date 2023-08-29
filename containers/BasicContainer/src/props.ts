import { PropsWithChildren } from "react";

export type CommonContainerProps = PropsWithChildren & {
  footer: React.ReactNode;
}