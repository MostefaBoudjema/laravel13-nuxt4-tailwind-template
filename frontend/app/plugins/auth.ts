import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuthStore()
  
  // Only fetch user if we have a token and no user data yet
  if (auth.token && !auth.user) {
    await auth.fetchUser()
  }
})
