<script setup lang="ts">
import { useAttrs } from 'vue'

type Variant = 'block' | 'text' | 'circle'

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()

const props = withDefaults(
  defineProps<{
    variant?: Variant
    lines?: number
  }>(),
  {
    variant: 'block',
    lines: 1,
  },
)

const lineWidths = (idx: number) => {
  if (props.variant !== 'text') return 'w-full'
  const mod = idx % 3
  if (mod === 0) return 'w-11/12'
  if (mod === 1) return 'w-10/12'
  return 'w-8/12'
}
</script>

<template>
  <div :class="lines > 1 ? 'space-y-3' : ''">
    <div
      v-for="i in lines"
      :key="i"
      v-bind="attrs"
      :class="[
        'relative overflow-hidden bg-slate-200/80 dark:bg-white/10',
        'before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:animate-[skeleton_1.2s_ease-in-out_infinite]',
        variant === 'circle' ? 'rounded-full' : 'rounded-xl',
        variant === 'text' ? ['h-3', lineWidths(i)] : 'h-5 w-full',
      ]"
    />
  </div>
</template>

<style scoped>
@keyframes skeleton {
  0% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(120%);
  }
}
</style>

