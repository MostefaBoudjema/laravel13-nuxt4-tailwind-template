<script setup lang="ts">
const { t } = useI18n()
const auth = useAuthStore()
const isMenuOpen = ref(false)
const isUserDropdownOpen = ref(false)

const handleLogout = async () => {
  await auth.logout()
  isMenuOpen.value = false
  isUserDropdownOpen.value = false
}
</script>

<template>
  <div class="min-h-screen dark:bg-slate-900 bg-slate-50 dark:text-white text-slate-900 transition-colors duration-300 selection:bg-purple-500/30 font-sans">
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-white/10 px-4 md:px-8 py-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center gap-3 group cursor-pointer" @click="navigateTo('/')">
          <div class="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:rotate-6 transition-all duration-300">
            <fa icon="dashboard" class="text-white text-lg" />
          </div>
          <span class="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-white dark:to-white/60">
            {{ t('saas_app') }}
          </span>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <ColorLanguageSwitcher />
          <div class="flex items-center gap-4 ml-4">
            <template v-if="!auth.isAuthenticated">
              <NuxtLink to="/login" class="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300 font-medium">
                {{ t('login') }}
              </NuxtLink>
              <NuxtLink to="/register" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/40 text-white transition-all duration-300 font-semibold">
                {{ t('register') }}
              </NuxtLink>
            </template>
            <template v-else>
              <div class="relative">
                <button 
                  @click="isUserDropdownOpen = !isUserDropdownOpen"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300 font-medium"
                >
                  <span class="text-slate-700 dark:text-slate-200">
                    {{ auth.user?.name }}
                  </span>
                  <fa icon="chevron-down" class="text-xs text-slate-400 transition-transform duration-300" :class="{ 'rotate-180': isUserDropdownOpen }" />
                </button>

                <!-- Dropdown Menu -->
                <div 
                  v-if="isUserDropdownOpen"
                  v-click-outside="() => isUserDropdownOpen = false"
                  class="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-white/10 py-2 z-50"
                >
                  <NuxtLink 
                    to="/dashboard" 
                    @click="isUserDropdownOpen = false"
                    class="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <fa icon="dashboard" class="w-4" />
                    {{ t('dashboard') }}
                  </NuxtLink>
                  <div class="my-1 border-t border-slate-200 dark:border-white/10"></div>
                  <button 
                    @click="handleLogout"
                    class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <fa icon="sign-out-alt" class="w-4" />
                    {{ t('logout') }}
                  </button>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Mobile Toggle -->
        <div class="md:hidden flex items-center gap-4">
          <ColorLanguageSwitcher />
          <button @click="isMenuOpen = !isMenuOpen" class="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5">
            <fa :icon="isMenuOpen ? 'times' : 'bars'" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0"
      >
        <div v-if="isMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 p-4 shadow-xl">
          <div class="flex flex-col gap-3">
            <template v-if="!auth.isAuthenticated">
              <NuxtLink to="/login" @click="isMenuOpen = false" class="w-full text-center py-3 rounded-xl border border-slate-200 dark:border-white/10 font-medium">
                {{ t('login') }}
              </NuxtLink>
              <NuxtLink to="/register" @click="isMenuOpen = false" class="w-full text-center py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold">
                {{ t('register') }}
              </NuxtLink>
            </template>
            <template v-else>
              <div class="px-4 py-2 text-sm font-bold text-purple-600 dark:text-purple-400 border-b border-slate-100 dark:border-white/5 mb-2">
                {{ auth.user?.name }}
              </div>
              <NuxtLink 
                to="/dashboard" 
                @click="isMenuOpen = false"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 font-medium transition-colors"
              >
                <fa icon="dashboard" class="text-slate-400" />
                {{ t('dashboard') }}
              </NuxtLink>
              <button 
                @click="handleLogout"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-colors"
              >
                <fa icon="sign-out-alt" />
                {{ t('logout') }}
              </button>
            </template>
          </div>
        </div>
      </transition>
    </nav>

    <main class="w-full mx-auto px-4 py-12">
      <slot />
    </main>

    <footer class="py-12 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 backdrop-blur-md text-center">
      <div class="max-w-7xl mx-auto px-4">
        <p class="text-slate-500 dark:text-white/40 text-sm">
          {{ t('copy_right') }}. {{ t('welcome') }}.
        </p>
      </div>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Outfit', sans-serif;
  margin: 0;
  padding: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}
</style>
