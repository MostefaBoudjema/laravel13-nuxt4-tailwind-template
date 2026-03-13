import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const auth = useAuthStore()

  // v-can: Show element if user has permission
  nuxtApp.vueApp.directive('can', {
    mounted(el, binding) {
      if (!auth.hasPermission(binding.value)) {
        el.parentNode?.removeChild(el)
      }
    },
    updated(el, binding) {
      if (!auth.hasPermission(binding.value)) {
        el.parentNode?.removeChild(el)
      }
    }
  })

  // v-role: Show element if user has role
  nuxtApp.vueApp.directive('role', {
    mounted(el, binding) {
      if (!auth.hasRole(binding.value)) {
        el.parentNode?.removeChild(el)
      }
    },
    updated(el, binding) {
      if (!auth.hasRole(binding.value)) {
        el.parentNode?.removeChild(el)
      }
    }
  })
})
