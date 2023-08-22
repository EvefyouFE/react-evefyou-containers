import React from 'react';
import enUS from './en-us';
import { MessageDescriptor, PrimitiveType } from 'react-intl';
export type Id = keyof typeof enUS;
type FormatXMLElementFn<T, R = string | T | (string | T)[]> = (parts: Array<string | T>) => R;
export type Values = Record<string, React.ReactNode | PrimitiveType | FormatXMLElementFn<React.ReactNode, React.ReactNode>>;
interface Props extends MessageDescriptor {
    id: Id;
    values?: Values;
}
type FormatMessageProps = (descriptor: Props, values?: Values) => string;
export declare const useLocale: () => {
    formatMessage: FormatMessageProps;
    formatById: (id: Id, values?: Values) => string;
};
export declare function formatMessage({ id, values }: Props): React.ReactNode;
export declare function formatById(id: Id, values?: Values): React.ReactNode;
export {};
