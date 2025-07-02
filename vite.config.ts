import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
import autoprefixer from 'autoprefixer'
const resolve = (dir: any) => path.join(__dirname, dir)

// 语言
import { updateLanguage } from './viteConfig/language'
updateLanguage('viteConfig/assets/language.xlsx', 'src/i18n/language/data.json')

export default ({ mode }: any) => {
  return defineConfig({
    base: loadEnv(mode, process.cwd()).VITE_PUBLIC_PATH,
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    css: {
      postcss: {
        plugins: [
          // 配置 autoprefixer
          autoprefixer({
            overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8', '> 1%'],
            grid: true
          })
        ]
      }
    },
    server: {
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_API_URL, // 目标服务器地址
          changeOrigin: true, // 是否改变源地址
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  })
}
