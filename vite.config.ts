/*
 * @Author: EvefyouFE
 * @Date: 2023-08-10 13:42:48
 * @FilePath: \react-evefyou-components\vite.config.ts
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

const libName = 'containers'

const externalPackages = [...Object.keys(pkg.peerDependencies)]
const regexOfPackages = externalPackages
  .map(packageName => new RegExp(`^${packageName}(\\/.*)?`));

const components = Object.keys(pkg.exports)
  .filter(e => e !== '.' && !e.includes('locales') && !e.includes('css'))
  .map(e => e.split('./')[1])
// console.log('components', components)
const locales = Object.keys(pkg.exports)
  .filter(e => e.includes('locales'))
  .map(e => e.split('./')[1])

const entries = Object.keys(pkg.exports).filter(e => !e.includes('css')).reduce((acc, cur) => {
  const isIndex = cur === '.'
  cur = cur.split('./')[1]
  const key = isIndex ? 'index' : cur
  const val = isIndex ? pathResolve(`${libName}/index.ts`) : pathResolve(`${libName}/${cur}/index.ts`)
  acc[key] = val
  return acc
}, {})

const formats = ['es', 'cjs']
console.log('entries', entries)

function moveFile(oldPath, newPath) {
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error('移动文件失败:', err);
    } else {
      console.log('文件已成功移动到新位置');
    }
  });
}
export default defineConfig({
  plugins: [
    react(),
    WindiCSS({
      scan: {
        dirs: [`./${libName}`],
        fileExtensions: ['tsx', 'ts']
      }
    }),
    tsconfigPaths(),
    dts({
      outDir: formats,
      rollupTypes: true,
      afterBuild() {
        console.log('start...', new Date().getTime())
        setTimeout(() => {
          formats.forEach(f => {
            components.forEach(comp => {
              const oldPath = pathResolve(`./${f}/${comp}.d.ts`)
              const newPath = pathResolve(`./${f}/${comp}/index.d.ts`)
              moveFile(oldPath, newPath)
            })
            locales.forEach(l => {
              fs.rm(pathResolve(`${f}/${l}.d.ts`), (err) => {
                console.error('删除文件失败:', err);
              })
              const ol = l.split('locales/')[1]
              const oldPath = pathResolve(`./${f}/${ol}.d.ts`)
              const newPath = pathResolve(`./${f}/${l}/index.d.ts`)
              console.log(oldPath, newPath)
              moveFile(oldPath, newPath)
            })
          })
        }, 10000);
      },
    }),
    libInjectCss({
      build: {
        manifest: true,
        minify: true,
        reportCompressedSize: true,
        cssCodeSplit: true,
        outDir: '.',
      },
      entry: entries,
      name: 'react-evefyou-containers',
      formats: formats as any,
      rollupOptions: {
        output: {
          minifyInternalExports: false,
          // manualChunks: (id) => components.find(e => id.includes(e))?.concat('/index'),
          chunkFileNames: '[format]/[name].js',
          assetFileNames: '[ext]/[name].[ext]',
          entryFileNames: (chunkInfo) => chunkInfo.name === 'index'
            ? '[format]/[name].js' : '[format]/[name]/index.js'
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
          hack: `true; @import (reference) "${pathResolve(`${libName}/styles/variables/index.less`)}";`,
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
