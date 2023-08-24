/*
* @Author: EvefyouFE
* @Date: 2023-08-16 14:28:09
 * @FilePath: \react-evefyou-containers\containers\locale\locale.ts
* @Description: 
* Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
* Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
*/
import React from 'react';
import enUS from './en_US';
import { FormattedMessage, MessageDescriptor, PrimitiveType, useIntl } from 'react-intl';

export type Id = keyof typeof enUS;
type FormatXMLElementFn<T, R = string | T | (string | T)[]> = (parts: Array<string | T>) => R;
export type Values = Record<string, React.ReactNode | PrimitiveType | FormatXMLElementFn<React.ReactNode, React.ReactNode>>;
interface Props extends MessageDescriptor {
  id: Id;
  values?: Values;
}
type FormatMessageProps = (descriptor: Props, values?: Values) => string;

export const useContainersLocale = () => {
  const { formatMessage: _formatMessage } = useIntl();
  const formatMessage: FormatMessageProps = _formatMessage;
  const formatById = (id: Id, values?: Values) => formatMessage({ id }, values);
  return {
    formatMessage,
    formatById
  };
};
export function formatContainersMessage({ id, values }: Props): React.ReactNode {
  return React.createElement(FormattedMessage, {
    id,
    values,
    key: id
  })
}

export function formatContainersById(id: Id, values?: Values) {
  return formatContainersMessage({ id, values })
}


