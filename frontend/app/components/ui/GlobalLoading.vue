<script setup lang="ts">
const { isLoading } = useLoading()
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[9999] pointer-events-none"
      aria-live="polite"
      aria-busy="true"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-slate-950/20 dark:bg-slate-950/40 backdrop-blur-[2px]" />

      <!-- Top progress bar -->
      <div class="absolute top-0 left-0 right-0 h-1 overflow-hidden">
        <div class="h-full w-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-[loadingbar_1.1s_ease-in-out_infinite]" />
      </div>

      <!-- Center spinner -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="pointer-events-none rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-white/10 px-6 py-5 shadow-2xl shadow-slate-900/10 dark:shadow-black/40 backdrop-blur-xl">
          <div class="flex items-center gap-4">
            <div class="relative w-10 h-10">
              <div class="absolute inset-0 rounded-full border-2 border-slate-200 dark:border-white/10" />
              <div class="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-600 border-r-purple-600 animate-spin" />
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-semibold text-slate-900 dark:text-white">Loading</span>
              <span class="text-xs text-slate-500 dark:text-white/50">Please wait…</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@keyframes loadingbar {
  0% {
    transform: translateX(-110%);
  }
  50% {
    transform: translateX(30%);
  }
  100% {
    transform: translateX(110%);
  }
}
</style>

