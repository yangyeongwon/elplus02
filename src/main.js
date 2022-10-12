import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import ko from 'element-plus/es/locale/lang/ko'
import 'element-plus/dist/index.css'
import './assets/css/icon.css'
import {useAuthStore} from './store/auth'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: ko
})

//아이콘 등록
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const auth = useAuthStore();
const authStorage = localStorage.getItem('auth');
if(!authStorage){
  auth.removeAuth();
}
const authData = JSON.parse(localStorage.getItem('auth'));
auth.setAuth(authData);

app.mount('#app')