import { createApp } from 'vue'
import App from './App.vue'
import './tailwind.css'
// Space Grotesk + JetBrains Mono are loaded from index.html.
import { applyLocale, localeState } from './lib/i18n'

applyLocale(localeState.locale)
createApp(App).mount('#app')
