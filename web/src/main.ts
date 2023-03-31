import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PortalVue from 'portal-vue'
import router from './router'
import { key, store } from './store'

const app = createApp(App)

app.use(PortalVue)
app.use(router)
app.use(store, key)
app.mount('#app')
