<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  title: 'Analytical Reports'
})

const auth = useAuthStore()
const config = useRuntimeConfig()

// Redirect to unauthorized if not admin or manager (manual check in page as example)
onMounted(() => {
  if (!auth.hasRole('admin') && !auth.hasRole('manager')) {
    navigateTo('/unauthorized')
  }
})

const { data: reportsData, pending, error } = await useFetch<any>('/reports', {
  baseURL: config.public.apiBase,
  headers: {
    Authorization: `Bearer ${auth.token}`
  }
})

const summary = computed(() => reportsData.value?.data?.summary || {})
const recent = computed(() => reportsData.value?.data?.recent_registrations || [])
</script>

<template>
  <div class="space-y-8">
    <div class="flex justify-between items-end">
      <div>
        <h2 class="text-2xl font-bold text-slate-800 tracking-tight">System Statistics</h2>
        <p class="text-slate-500">Real-time breakdown of your application health and growth</p>
      </div>
      <div class="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
        Updated: {{ reportsData?.data?.generated_at ? new Date(reportsData.data.generated_at).toLocaleTimeString() : '...' }}
      </div>
    </div>

    <!-- Summary Widgets -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="(val, key) in summary" :key="key" class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
        <div class="absolute right-0 top-0 h-full w-2 bg-indigo-500"></div>
        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{{ key.replace('_', ' ') }}</p>
        <p class="text-4xl font-extrabold text-slate-800">{{ val }}</p>
        <div class="mt-4 flex items-center gap-2 text-emerald-500 font-bold text-xs">
          <fa icon="check-circle" />
          <span>Active & Verified</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Registrations -->
      <div class="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="px-8 py-6 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
          <h3 class="font-bold text-slate-800">Recent Registrations</h3>
        </div>
        <div class="p-0">
          <div v-for="user in recent" :key="user.id" class="px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors border-b last:border-0 border-slate-50">
             <div class="flex items-center gap-3">
               <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">
                 {{ user.name.charAt(0) }}
               </div>
               <div>
                 <p class="font-bold text-sm text-slate-800">{{ user.name }}</p>
                 <p class="text-xs text-slate-400">{{ user.email }}</p>
               </div>
             </div>
             <div class="text-right">
               <p class="text-xs font-bold text-slate-800">{{ new Date(user.created_at).toLocaleDateString() }}</p>
               <p class="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{{ new Date(user.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</p>
             </div>
          </div>
        </div>
      </div>

      <!-- Quick Analysis -->
      <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white">
        <h3 class="font-bold text-xl mb-6">Growth Analysis</h3>
        <div class="space-y-8">
          <div>
            <div class="flex justify-between mb-2">
              <span class="text-sm text-slate-400">Retention Rate</span>
              <span class="text-sm font-bold">84%</span>
            </div>
            <div class="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div class="bg-indigo-500 h-full w-[84%]"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between mb-2">
              <span class="text-sm text-slate-400">API Uptime</span>
              <span class="text-sm font-bold">99.9%</span>
            </div>
            <div class="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div class="bg-emerald-500 h-full w-[99.9%]"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between mb-2">
              <span class="text-sm text-slate-400">Server Load</span>
              <span class="text-sm font-bold">12%</span>
            </div>
            <div class="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div class="bg-amber-500 h-full w-[12%]"></div>
            </div>
          </div>
        </div>
        
        <div class="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10">
           <p class="text-sm text-white/60 leading-relaxed italic">
             "The system is currently operating at peak efficiency. No immediate scaling required for the current user load."
           </p>
        </div>
      </div>
    </div>
  </div>
</template>
