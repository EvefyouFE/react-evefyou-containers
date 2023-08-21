import { JSXElementConstructor, ReactElement, RefObject } from "react";

export type Children = ReactElement<
  any,
  string | JSXElementConstructor<any>
> | null;
export interface KeepAliveComponentProps {
  active: boolean;
  children: Children;
  name: string;
  renderDiv: RefObject<HTMLDivElement>;
}

export interface KeepAliveProps {
  includes?: Array<string>;
  excludes?: Array<string>;
  maxLen?: number;
  children: Children;
  active?: boolean;
}