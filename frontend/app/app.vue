<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

// Hydrate user on app init
// Nuxt 4: code in script setup of app.vue runs on both server and client during hydration
if (auth.token && !auth.user) {
  await auth.fetchUser()
}
</script>

<template>
  <div>
    <UiGlobalLoading />
    <ClientOnly>
      <UiToaster />
    </ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>


