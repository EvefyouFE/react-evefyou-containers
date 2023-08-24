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

type ContainersId = keyof typeof enUS;
type ContainersFormatXMLElementFn<T, R = string | T | (string | T)[]> = (parts: Array<string | T>) => R;
type ContainersValues = Record<string, React.ReactNode | PrimitiveType | ContainersFormatXMLElementFn<React.ReactNode, React.ReactNode>>;
interface ContainersProps extends MessageDescriptor {
  id: ContainersId;
  values?: ContainersValues;
}
type FormatMessageProps = (descriptor: ContainersProps, values?: ContainersValues) => string;

export const useContainersLocale = () => {
  const { formatMessage: _formatMessage } = useIntl();
  const formatMessage: FormatMessageProps = _formatMessage;
  const formatById = (id: ContainersId, values?: ContainersValues) => formatMessage({ id }, values);
  return {
    formatMessage,
    formatById
  };
};
export function formatContainersMessage({ id, values }: ContainersProps): React.ReactNode {
  return React.createElement(FormattedMessage, {
    id,
    values,
    key: id
  })
}

export function formatContainersById(id: ContainersId, values?: ContainersValues) {
  return formatContainersMessage({ id, values })
}


