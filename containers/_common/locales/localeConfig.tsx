/*
 * @Author: EvefyouFE
 * @Date: 2023-08-16 14:28:44
 * @FilePath: \react-evefyou-containers\components\_common\locales\localeConfig.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import antdEnUS from 'antd/locale/en_US';
import antdZhCN from 'antd/locale/zh_CN';
import React from 'react';
import { ReactComponent as EnUsSvg } from '@/assets/en_US.svg';
import { ReactComponent as ZhCnSvg } from '@/assets/zh_CN.svg';
import enUSLocale from './en-us';
import zhCNLocale from './zh-cn';

export enum LocaleTypeEnum {
  enUS = 'en-us',
  zhCN = 'zh-cn',
}
export type Locale = `${LocaleTypeEnum}`;

interface LocaleConfig {
  name: string;
  key: Locale;
  messages: Record<string, string>;
  icon: React.ReactNode;
  antdMessages: any;
}

export const localeConfig: LocaleConfig[] = [
  {
    name: 'English',
    key: 'en-us',
    messages: enUSLocale,
    icon: <EnUsSvg />,
    antdMessages: antdEnUS,
  },
  {
    name: '简体中文',
    key: 'zh-cn',
    messages: zhCNLocale,
    icon: <ZhCnSvg />,
    antdMessages: antdZhCN,
  },
];
