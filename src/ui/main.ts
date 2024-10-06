import { createApp } from 'vue'
import 'primeicons/primeicons.css'
import '@/assets/main.css'
import ToastService from 'primevue/toastservice';
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        
    },
})
app.use(ToastService)
app.use(router)
app.mount('#app')
