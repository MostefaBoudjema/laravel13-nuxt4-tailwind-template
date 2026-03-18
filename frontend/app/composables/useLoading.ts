export type UseLoadingApi = {
  count: Readonly<Ref<number>>
  isLoading: Readonly<Ref<boolean>>
  start: () => void
  finish: () => void
  wrap: <T>(promise: Promise<T>) => Promise<T>
}

export const useLoading = (): UseLoadingApi => {
  const count = useState<number>('global-loading-count', () => 0)

  const start = () => {
    count.value += 1
  }

  const finish = () => {
    count.value = Math.max(0, count.value - 1)
  }

  const isLoading = computed(() => count.value > 0)

  const wrap = async <T>(promise: Promise<T>) => {
    start()
    try {
      return await promise
    } finally {
      finish()
    }
  }

  return {
    count: readonly(count),
    isLoading: readonly(isLoading),
    start,
    finish,
    wrap,
  }
}

