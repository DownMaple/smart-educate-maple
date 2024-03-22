// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    //定义要全局设置的 CSS 文件/模块/库（包含在每个页面中）。
    "element-plus/dist/index.css", //项目中的scss文件
    "@/assets/styles/main.scss", //项目中的scss文件
    "@/assets/styles/reset.scss", //项目中的scss文件
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/global.scss";'
        }
      }
    },
  },
  app: {
    //全局应用配置
    baseURL: "", //基本url
    buildAssetsDir: "/_nuxt/", //默认： "/_nuxt/"构建站点资产的文件夹名称，相对于baseURL（或cdnURL如果已设置）。
    keepalive: false, //页面之间 KeepAlive 配置,单个页面上可配置definePageMeta覆盖
    head: {
      //在每个页面上设置默认配置<head>。
      title:'济南职业学院',
      meta: [
        {
          name: "viewport",
          content: "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0",
        },
        {
          charset: "utf-8",
        },
        {
          'http-equiv':'X-UA-Compatible',
          content:'ie=edge'
        }
      ],
      link: [],
      style: [],
      script: [],
      noscript: [],
    },
    rootTag: "div", //自定义nuxt根元素标签 默认 div
    layoutTransition: false, //是否开启布局切换过渡动画
    pageTransition: { name: "page", mode: "out-in" }, //页面过渡动画
  },
  devServer: {
    //开发服务器
    host: "", //默认值:localhost
    https: false, //是否开启https
    port: 3001, //监听端口 默认"3000"
    url: "http://localhost:3001", //监听url
  }
})
