import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faUser, 
  faLock, 
  faSignOutAlt, 
  faDashboard, 
  faUsers, 
  faChartBar, 
  faCog,
  faExclamationTriangle,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons'

// This is important, we are going to let Nuxt handle the CSS
config.autoAddCss = false

library.add(
  faUser, 
  faLock, 
  faSignOutAlt, 
  faDashboard, 
  faUsers, 
  faChartBar, 
  faCog,
  faExclamationTriangle,
  faCheckCircle
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('fa', FontAwesomeIcon)
})
