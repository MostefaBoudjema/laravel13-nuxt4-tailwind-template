<script setup lang="ts">
import { gsap } from 'gsap'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  title: 'Dashboard Overview'
})

const auth = useAuthStore()

// Staggered reveal for stats
const statsContainer = ref()
onMounted(() => {
  gsap.from('.stat-card', {
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.2
  })
})
</script>

<template>
  <div class="space-y-8">
    <!-- Welcome Section -->
    <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
      <div class="relative z-10 max-w-2xl">
        <h2 class="text-4xl font-bold mb-4">Welcome back, {{ auth.user?.name }}! ✨</h2>
        <p class="text-indigo-100 text-lg leading-relaxed mb-6">
          Everything looks great today. You have full access to your resources and can manage your data from the sidebar.
        </p>
        <div class="flex gap-4">
          <button class="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-lg">New Project</button>
          <button class="bg-indigo-500/20 text-white border border-indigo-400/30 px-6 py-3 rounded-xl font-bold hover:bg-indigo-500/30 transition-colors">Documentation</button>
        </div>
      </div>
      <!-- Background SVG Decor -->
      <div class="absolute right-0 top-0 h-full w-1/3 opacity-10 flex items-center justify-center p-8">
        <fa icon="dashboard" class="text-[200px]" />
      </div>
    </div>

    <!-- Stats Grid -->
    <div ref="statsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="i in 4" :key="i" class="stat-card bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <fa :icon="['dashboard', 'users', 'chart-bar', 'cog'][i-1]" />
          </div>
          <span class="text-emerald-500 font-bold text-sm bg-emerald-50 px-2 py-1 rounded-lg">+12.5%</span>
        </div>
        <p class="text-slate-500 font-medium mb-1">
          {{ ['Total Revenue', 'Active Users', 'Monthly Sales', 'System Uptime'][i-1] }}
        </p>
        <h3 class="text-2xl font-bold text-slate-800">
          {{ ['$45,230', '2,450', '842', '99.9%'][i-1] }}
        </h3>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
      <h3 class="text-xl font-bold mb-6 flex items-center gap-3">
        <fa icon="chart-bar" class="text-indigo-600" />
        Activity Feed
      </h3>
      <div class="space-y-6">
        <div v-for="j in 5" :key="j" class="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors border-l-4 border-transparent hover:border-indigo-600">
          <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <fa icon="user" />
          </div>
          <div class="flex-1">
            <p class="font-semibold text-slate-800 text-sm">Action performed by system</p>
            <p class="text-xs text-slate-500">2 hours ago</p>
          </div>
          <fa icon="check-circle" class="text-emerald-500" />
        </div>
      </div>
    </div>
  </div>
</template>
