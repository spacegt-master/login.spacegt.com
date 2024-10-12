import {
	createApp
} from 'vue'
import App from './App.vue'
// element+ UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 路由
import router from './router/index.js'
// 数据持久化
import {
	createPinia
} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.mount('#app')