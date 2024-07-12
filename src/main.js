import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import SvgIcon from '@/components/SvgIcon/index.vue'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './permission'

const app = createApp(App)

for (const [name, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(name, component);
}

app.use(router)
  .use(ElementPlus)
  .use(createPinia())
  .component('svg-icon', SvgIcon)
  .mount('#app')
