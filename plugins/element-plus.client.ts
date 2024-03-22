import { defineNuxtPlugin } from '#app'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ElementPlus from 'element-plus'

export default defineNuxtPlugin(nuxtApp=>{
  nuxtApp.vueApp.use(ElementPlus,{locale: zhCn})
})