import './style.css'

import { createApp } from 'vue'
import { DynamiaVue } from '@dynamia-tools/vue'
import App from './App.vue'
import router from './router'
import { dynamiaClient } from './lib/dynamia'

createApp(App)
  .use(router)
  .use(DynamiaVue, { client: dynamiaClient })
  .mount('#app')
