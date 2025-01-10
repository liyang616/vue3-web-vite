import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css/normalize.css' // 统一浏览器默认样式，放第一个
import { ApiPlugin } from '@/api/index' // api接口
import './style/index.scss' // 全局样式
import { createPinia } from 'pinia'
const pinia = createPinia()
import i18n from './i18n/index'

const app = createApp(App)
// 全局变量
app.config.globalProperties.$language = ref<string>(localStorage.getItem('language') || 'en-US')
app.use(pinia).use(router).use(ApiPlugin).use(i18n).mount('#app')
