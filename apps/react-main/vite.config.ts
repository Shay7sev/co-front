import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import vitePluginCompression from 'vite-plugin-compression'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const baseUrl = 'react-main'

export default defineConfig((config) => {
  return {
    define: {
      'process.env': {},
    },
    plugins: [
      react(),
      // * 使用 svg 图标
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      vitePluginCompression({
        threshold: 1024 * 10, // 对大于 10kb 的文件进行压缩
        // deleteOriginFile: true,
      }),
    ],
    resolve: {
      alias: {
        '@': `${resolve(process.cwd(), 'src')}`,
      },
    },
    server: {
      open: true,
      port: 5793,
      https: config.mode !== 'development',
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    // base: config.mode === 'development' ? '/' : `/${baseUrl}/`,
    build: {
      outDir: `../../${baseUrl}`,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
          entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
          assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          },
        },
      },
    },
  }
})
