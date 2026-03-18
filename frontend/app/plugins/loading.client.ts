export default defineNuxtPlugin(() => {
  const loading = useLoading()
  const nuxtApp = useNuxtApp()

  nuxtApp.hook('page:start', () => loading.start())
  nuxtApp.hook('page:finish', () => loading.finish())
  nuxtApp.hook('app:error', () => loading.finish())
})

