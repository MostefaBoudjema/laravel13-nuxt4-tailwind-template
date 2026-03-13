<script setup lang="ts">
import { gsap } from 'gsap'
import { useAuthStore } from '~/stores/auth'
const { t } = useI18n()
const auth = useAuthStore()

definePageMeta({
  layout: 'default',
  auth: false // Explicitly public
})

const heroRef = ref()

onMounted(() => {
  const tl = gsap.timeline()
  
  tl.from(heroRef.value.querySelector('.hero-title'), {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power4.out'
  })
  .from(heroRef.value.querySelector('.hero-subtitle'), {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.4')
  .from(heroRef.value.querySelectorAll('.cta-btn'), {
    opacity: 0,
    scale: 0.8,
    stagger: 0.1,
    duration: 0.5,
    ease: 'back.out(1.7)'
  }, '-=0.3')
  .from('.feature-card', {
    opacity: 0,
    y: 40,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.2')
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden selection:bg-indigo-500 selection:text-white">
    <!-- Abstract Background Decor -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
      <div class="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-purple-500/10 blur-[100px] rounded-full"></div>
      <div class="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-emerald-500/10 blur-[150px] rounded-full"></div>
    </div>

    <!-- Navigation -->
    <nav class="relative z-10 px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
      <div class="flex items-center gap-3 group cursor-pointer">
        <div class="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
          <fa icon="rocket" class="text-white text-lg" />
        </div>
        <span class="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 tracking-tight">
          SaaS<span class="text-indigo-600 font-extrabold italic">Pro</span>
        </span>
      </div>
      <div class="flex items-center gap-6">
        <template v-if="!auth.isAuthenticated">
          <NuxtLink to="/login" class="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            {{ t('login') }}
          </NuxtLink>
          <NuxtLink to="/register" class="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-500/20">
            {{ t('get_started') }}
          </NuxtLink>
        </template>
        <template v-else>
          <NuxtLink to="/dashboard" class="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-500/20">
            {{ t('dashboard') }}
          </NuxtLink>
        </template>
      </div>
    </nav>

    <!-- Hero Section -->
    <section ref="heroRef" class="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center text-center">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 mb-8 hero-subtitle">
        <span class="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
        <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{{ t('new_v2_launch') || 'v2.0 is now live' }}</span>
      </div>
      
      <h1 class="hero-title text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
        Design <span class="text-indigo-600">Faster</span>.<br />
        Scale <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 italic">Everything.</span>
      </h1>
      
      <p class="hero-subtitle text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mb-12 leading-relaxed">
        {{ t('hero_description') || 'The modern SaaS starter kit powered by Laravel 12 and Nuxt 4. Build, manage, and scale your application with state-of-the-art security and design patterns.' }}
      </p>

      <div class="flex flex-wrap justify-center gap-4">
        <NuxtLink :to="auth.isAuthenticated ? '/dashboard' : '/register'" class="cta-btn bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-indigo-500/40 flex items-center gap-3">
          {{ auth.isAuthenticated ? t('dashboard') : t('start_free_trial') || 'Start Free Trial' }}
          <fa icon="arrow-right" class="text-sm opacity-50" />
        </NuxtLink>
        <NuxtLink v-if="!auth.isAuthenticated" to="/dashboard" class="cta-btn bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-lg">
          {{ t('view_demo') || 'View Demo' }}
        </NuxtLink>
      </div>

      <!-- Hero Dashboard Mockup -->
      <div class="mt-24 relative w-full max-w-5xl mx-auto hero-subtitle">
        <div class="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 blur-2xl opacity-20 rounded-[3rem]"></div>
        <div class="relative bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden aspect-video group">
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 backdrop-blur-[2px]">
            <NuxtLink :to="auth.isAuthenticated ? '/dashboard' : '/login'" class="bg-white text-slate-950 px-8 py-3.5 rounded-2xl font-black hover:scale-110 transition-transform flex items-center gap-3">
               <fa icon="play" class="text-xs" />
               {{ auth.isAuthenticated ? t('go_to_dashboard') || 'Go to Dashboard' : t('watch_demo') || 'Watch Demo Video' }}
            </NuxtLink>
          </div>
          <!-- Mockup Content Icons -->
          <div class="absolute top-8 left-8 flex gap-2">
            <div class="w-3 h-3 rounded-full bg-rose-500"></div>
            <div class="w-3 h-3 rounded-full bg-amber-500"></div>
            <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
          </div>
          <div class="h-full w-full flex items-center justify-center opacity-10">
             <fa icon="th-large" class="text-[20rem]" />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="relative z-10 max-w-7xl mx-auto px-8 pb-32">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(feature, i) in [
          { icon: 'shield-alt', title: 'Enterprise Security', desc: 'Spatie permissions, JWT auth, and role-based access control built in.', color: 'emerald' },
          { icon: 'zap', title: 'Nitro Performance', desc: 'Server-side rendering with Nuxt 4 and high-speed API with Laravel 12.', color: 'indigo' },
          { icon: 'layer-group', title: 'Scalable UI', desc: 'Premium components with GSAP animations and dark mode support.', color: 'purple' }
        ]" :key="i" class="feature-card p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-500/20 transition-all duration-500">
          <div :class="`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-${feature.color}-500/10 text-${feature.color}-600 dark:text-${feature.color}-400`">
            <fa :icon="feature.icon" class="text-2xl" />
          </div>
          <h3 class="text-2xl font-bold mb-4 tracking-tight">{{ feature.title }}</h3>
          <p class="text-slate-500 dark:text-slate-400 leading-relaxed">{{ feature.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="relative z-10 px-8 py-12 border-t border-slate-200 dark:border-slate-800 text-center">
       <p class="text-sm font-bold text-slate-400 uppercase tracking-widest leading-loose">
         © 2026 SaaS<span class="text-indigo-600">Pro</span> Framework. <br />
         {{ t('all_rights_reserved') || 'Crafted with precision for modern developers.' }}
       </p>
    </footer>
  </div>
</template>

<style scoped>
.hero-title {
  text-shadow: 0 10px 40px rgba(99, 102, 241, 0.05);
}
</style>
