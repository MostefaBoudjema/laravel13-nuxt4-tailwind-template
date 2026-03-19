export function useToast() {
  const nuxtApp = useNuxtApp()

  const base = nuxtApp.$toast

  return {
    /** Generic toast */
    show: base,
    /** Success toast */
    success: base.success,
    /** Error toast */
    error: base.error,
    /** Info / alert-style toast */
    info: base.info,
    /** Warning toast */
    warning: base.warning,
  }
}

