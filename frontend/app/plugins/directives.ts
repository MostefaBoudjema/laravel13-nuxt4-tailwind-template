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

  // v-click-outside: Handle clicks outside of an element
  nuxtApp.vueApp.directive('click-outside', {
    mounted(el: any, binding: any) {
      el.clickOutsideEvent = (event: MouseEvent) => {
        if (!(el === event.target || el.contains(event.target as Node))) {
          binding.value(event)
        }
      }
      document.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted(el: any) {
      document.removeEventListener('click', el.clickOutsideEvent)
    }
  })
})
