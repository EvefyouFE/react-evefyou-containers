/*
 * @Author: EvefyouFE
 * @Date: 2023-08-10 13:42:48
 * @FilePath: \react-evefyou-containers\vite.config.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import pkg from './package.json';
import cssnanoPlugin from "cssnano";
import postcssPresetEnv from 'postcss-preset-env';
import WindiCSS from 'vite-plugin-windicss';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import fs from 'fs';

const pathResolve = (v: string) => path.resolve(__dirname, v)

const externalPackages = [...Object.keys(pkg.peerDependencies)]
const regexOfPackages = externalPackages
  .map(packageName => new RegExp(`^${packageName}(\\/.*)?`));

const entries = {
  'index': pathResolve('containers/index.ts'),
  'locale/en_US': pathResolve('containers/locale/en_US.ts'),
  'locale/zh_CN': pathResolve('containers/locale/zh_CN.ts'),
}

const locales = Object.keys(pkg.exports)
  .filter(e => e.includes('locale'))
  .map(e => e.split('./')[1])
const components = Object.keys(pkg.exports)
  .filter(e => e !== '.' && !e.includes('locale'))
  .map(e => e.split('./')[1])

console.log('containers', components)

export default defineConfig({
  plugins: [
    react(),
    WindiCSS({
      scan: {
        dirs: ['./containers'],
        fileExtensions: ['tsx', 'ts']
      }
    }),
    tsconfigPaths(),
    dts({
      rollupTypes: true,
      afterBuild: () => {
        const directoryPath = '.';
        const regexToDelete = /_\w+\.d\.ts$/;
        fs.readdirSync(directoryPath).forEach((file) => {
          const filePath = path.join(directoryPath, file);
          if (regexToDelete.test(file)) {
            try {
              fs.unlinkSync(filePath);
              console.log(`Deleted file: ${filePath}`);
            } catch (err) {
              console.error(`Error deleting file: ${err}`);
            }
          }
        });
      }
    }),
    libInjectCss({
      build: {
        minify: true,
        reportCompressedSize: true,
        cssCodeSplit: true,
        outDir: '.',
      },
      entry: entries,
      fileName: (format, entryName) => {
        return entryName === 'index'
          ? `${format}/index.js`
          : `${format}/[name]/index.js`
      },
      name: 'react-evefyou-containers',
      formats: ["es", "cjs"],
      rollupOptions: {
        output: {
          minifyInternalExports: false,
          manualChunks: (id) => {
            let en = components.find(e => id.includes(e))
            en ??= locales.find(l => id.includes(l.split('_')[0]))
            console.log('manualChunks', en, id)
            return en
          },
          chunkFileNames: () => {
            // console.log('chunkInfo', chunkInfo.name)
            return '[format]/[name]/index.js'
          },
          assetFileNames: '[ext]/[name].[ext]',
        },
        external: regexOfPackages
      }
    })
  ],
  css: {
    modules: {
      localsConvention: 'camelCase'
    },
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve('containers/_common/styles/variables/index.less')}";`,
          'primary-color': '#0960bd',
          'text-color': '#c9d1d9',
          'text-color-base': '#000000d9',
        }
      }
    },
    postcss: {
      plugins: [
        cssnanoPlugin({
          preset: 'default',
        }) as any,
        postcssPresetEnv({

        })
      ]
    }
  },
})
