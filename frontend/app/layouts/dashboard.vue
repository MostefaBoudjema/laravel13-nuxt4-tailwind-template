<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore()
</script>

<template>
  <div class="flex min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
    <!-- Sidebar -->
    <aside class="w-72 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 left-0 z-50">
      <div class="p-8 flex items-center gap-3">
        <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <fa icon="dashboard" class="text-white" />
        </div>
        <span class="text-xl font-bold tracking-tight text-slate-800">SaaS Dashboard</span>
      </div>

      <nav class="flex-1 px-4 space-y-1">
        <NuxtLink to="/" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-indigo-50 group hover:text-indigo-600 font-medium" :class="{'bg-indigo-600 text-white shadow-lg shadow-indigo-100': $route.path === '/'}">
          <fa icon="dashboard" />
          <span>Dashboard</span>
        </NuxtLink>

        <NuxtLink v-if="auth.hasRole('admin')" to="/users" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-indigo-50 group hover:text-indigo-600 font-medium" :class="{'bg-indigo-600 text-white shadow-lg shadow-indigo-100': $route.path === '/users'}">
          <fa icon="users" />
          <span>Users</span>
        </NuxtLink>

        <NuxtLink v-if="auth.hasRole('admin') || auth.hasRole('manager')" to="/reports" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-indigo-50 group hover:text-indigo-600 font-medium" :class="{'bg-indigo-600 text-white shadow-lg shadow-indigo-100': $route.path === '/reports'}">
          <fa icon="chart-bar" />
          <span>Reports</span>
        </NuxtLink>

        <NuxtLink to="/settings" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-indigo-50 group hover:text-indigo-600 font-medium" :class="{'bg-indigo-600 text-white shadow-lg shadow-indigo-100': $route.path === '/settings'}">
          <fa icon="cog" />
          <span>Settings</span>
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-slate-100">
        <button @click="auth.logout()" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-600 hover:bg-rose-50 transition-all duration-200 font-medium group">
          <fa icon="sign-out-alt" class="group-hover:translate-x-1 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col ml-72 overflow-y-auto h-screen">
      <!-- Topbar -->
      <header class="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
        <h1 class="text-xl font-semibold text-slate-800">{{ $route.meta.title || 'Welcome back' }}</h1>
        <div class="flex items-center gap-4">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-bold text-slate-900">{{ auth.user?.name }}</p>
            <p class="text-xs text-slate-500 uppercase font-semibold tracking-wider">{{ auth.user?.roles[0] }}</p>
          </div>
          <div class="w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-50 border border-indigo-200 rounded-full flex items-center justify-center font-bold text-indigo-700">
            {{ auth.user?.name.charAt(0) }}
          </div>
        </div>
      </header>

      <main class="p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
}

.router-link-active:not(#logout) {
  @apply bg-indigo-600 text-white shadow-lg shadow-indigo-100;
}
</style>
