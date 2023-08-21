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

const pathResolve = (v: string) => path.resolve(__dirname, v)

const externalPackages = [...Object.keys(pkg.peerDependencies)]
const regexOfPackages = externalPackages
  .map(packageName => new RegExp(`^${packageName}(\\/.*)?`));

const entries = {
  'index': pathResolve('containers/index.ts'),
  'BasicContainer': pathResolve('containers/BasicContainer'),
  'TabContainer': pathResolve('containers/TabContainer'),
  'TableContainer': pathResolve('containers/TableContainer'),
  'KeepAliveContainer': pathResolve('containers/KeepAliveContainer'),
}
const otherEntryFile = Object.keys(entries).filter(e => e !== 'index')

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
      insertTypesEntry: true,
      // rollupTypes: true,
      outDir: ['dist/cjs', 'dist/es'],
      beforeWriteFile: (filePath, content) => {
        const entryDFile = otherEntryFile
          .map(e => e.concat('.d.ts'))
          .find(e => filePath.includes(e))
        return entryDFile ? false : { filePath, content }
      },
    }),
    libInjectCss({
      build: {
        manifest: true,
        minify: true,
        reportCompressedSize: true,
        cssCodeSplit: true,
      },
      entry: entries,
      fileName: (format, entryName) => entryName === 'index'
        ? `${format}/index.${format === 'cjs' ? format : 'js'}`
        : `${format}/${entryName}/index.${format === 'cjs' ? format : 'js'}`,
      name: 'react-evefyou-containers',
      formats: ["es", "cjs"],
      rollupOptions: {
        output: {
          entryFileNames: (chunkInfo) => {
            // console.log('chunkInfo', chunkInfo)
            return chunkInfo.name === 'index' ? `[format]/index.js` : `[format]/[name]/index.js`
          },
          chunkFileNames: (chunkInfo) => otherEntryFile.reduce(
            (acc, cur) => !chunkInfo.isEntry && chunkInfo.moduleIds.findIndex(s => s.includes(cur)) !== -1
              ? `[format]/${cur}/other.js` : acc,
            '[format]/_common/[name]/[name].js'
          ),
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
          'text-color-base': '#000000d9'
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
