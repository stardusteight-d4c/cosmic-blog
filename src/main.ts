import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PortalVue from 'portal-vue'
import router from './router'
import PhosphorVue from 'phosphor-vue'
// @ts-ignore
import VueHighlightJS from 'vue3-highlightjs'
import 'highlight.js/styles/solarized-light.css'

const app = createApp(App)

app.use(PortalVue)
app.use(router)
app.use(PhosphorVue)
app.use(VueHighlightJS)
app.mount('#app')
