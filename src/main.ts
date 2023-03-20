import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PortalVue from 'portal-vue'
import router from './router'
import PhosphorVue from 'phosphor-vue'

const app = createApp(App)

app.use(PortalVue)
app.use(router)
app.use(PhosphorVue)
app.mount('#app')
