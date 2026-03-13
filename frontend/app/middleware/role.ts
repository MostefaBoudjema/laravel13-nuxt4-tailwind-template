import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()
  const requiredRole = to.meta.role as string

  if (!requiredRole) return

  if (!auth.hasRole(requiredRole)) {
    return navigateTo('/unauthorized')
  }
})
