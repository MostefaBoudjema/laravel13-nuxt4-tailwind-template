<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const currentLocale = computed(() => locales.value.find(l => l.code === locale.value))
</script>

<template>
  <div class="flex items-center gap-4">
    <!-- Language Switcher -->
    <div class="relative group">
      <button class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 border border-white/10 transition-all">
        <span class="text-sm font-medium">{{ currentLocale?.name }}</span>
        <fa icon="chevron-down" class="text-[10px] opacity-50 group-hover:rotate-180 transition-transform" />
      </button>
      
      <div class="absolute right-0 mt-2 w-32 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-black/5 dark:border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <button 
          v-for="loc in locales" 
          :key="loc.code"
          @click="setLocale(loc.code)"
          class="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
          :class="{ 'text-purple-500 font-bold': locale === loc.code, 'text-slate-700 dark:text-slate-300': locale !== loc.code }"
        >
          {{ loc.name }}
        </button>
      </div>
    </div>

    <!-- Mode Toggle -->
    <button 
      @click="toggleColorMode"
      class="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 border border-white/10 transition-all"
      aria-label="Toggle Dark Mode"
    >
      <fa :icon="colorMode.value === 'dark' ? 'sun' : 'moon'" class="text-lg" />
    </button>
  </div>
</template>
