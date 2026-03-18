/**
 * Global API client composable
 *
 * Wraps Nuxt's $fetch with the configured base URL and credentials.
 *
 * Usage:
 *   const api = useApi()
 *   const users = await api('/users')
 *   await api('/users', { method: 'POST', body: { name: 'John' } })
 */
export const useApi = () => {
  const config = useRuntimeConfig()
  const loading = useLoading()

  const api = $fetch.create({
    baseURL: config.public.apiBase as string,
    credentials: 'include',
    onRequest() {
      loading.start()
    },
    onRequestError() {
      loading.finish()
    },
    onResponse() {
      loading.finish()
    },
    onResponseError() {
      loading.finish()
    },
  })

  return api
}
