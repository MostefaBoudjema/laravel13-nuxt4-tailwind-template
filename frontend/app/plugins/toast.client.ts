import { Toaster, toast } from 'vue-sonner'

export default defineNuxtPlugin((nuxtApp) => {
  // Global toaster component
  nuxtApp.vueApp.component('UiToaster', Toaster)

  // Provide toast helper so you can use useNuxtApp().$toast or useToast()
  return {
    provide: {
      toast,
    },
  }
})

