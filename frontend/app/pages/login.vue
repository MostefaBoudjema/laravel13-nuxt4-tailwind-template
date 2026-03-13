<script setup lang="ts">
import { gsap } from 'gsap'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'default',
  middleware: 'guest'
})

const auth = useAuthStore()
const form = reactive({
  email: '',
  password: ''
})
const loading = ref(false)
const errors = ref<Record<string, string[]>>({})

// GSAP reveals
const loginBox = ref()
const loginTitle = ref()
const loginItems = ref([])

onMounted(() => {
  const tl = gsap.timeline()
  tl.from(loginBox.value, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
  })
  .from(loginTitle.value, {
    opacity: 0,
    x: -20,
    duration: 0.8
  }, "-=0.5")
  .from(loginItems.value, {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.6
  }, "-=0.4")
})

const handleLogin = async () => {
  loading.value = true
  errors.value = {}
  
  try {
    const response = await $fetch<{ token: string, user: any }>('/login', {
      method: 'POST',
      baseURL: useRuntimeConfig().public.apiBase,
      body: form
    })
    
    auth.setToken(response.token)
    auth.setUser(response.user)
    
    // Animate out before navigating
    gsap.to(loginBox.value, {
      opacity: 0,
      scale: 0.95,
      y: -20,
      duration: 0.5,
      onComplete: () => navigateTo('/')
    })
  } catch (e: any) {
    if (e.response?._data?.errors) {
      errors.value = e.response._data.errors
    } else {
      errors.value = { server: [e.message || 'An unexpected error occurred'] }
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-[70vh]">
    <div ref="loginBox" class="w-full max-w-md p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden group">
      <!-- Background decoration -->
      <div class="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 blur-3xl rounded-full group-hover:bg-purple-500/30 transition-colors duration-500"></div>
      <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-pink-500/20 blur-3xl rounded-full group-hover:bg-pink-500/30 transition-colors duration-500"></div>

      <div class="relative z-10">
        <div class="mb-10">
          <h2 ref="loginTitle" class="text-4xl font-bold mb-2">Login</h2>
          <p class="text-white/60">Enter your credentials to access your account</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div ref="el => loginItems[0] = el">
            <label class="block text-sm font-semibold mb-2 ml-1">Email Address</label>
            <div class="relative">
              <fa icon="user" class="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input 
                v-model="form.email" 
                type="email" 
                placeholder="email@example.com" 
                class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-white/20"
                required
              />
            </div>
            <p v-if="errors.email" class="text-rose-400 text-xs mt-2 ml-1">{{ errors.email[0] }}</p>
          </div>

          <div ref="el => loginItems[1] = el">
            <label class="block text-sm font-semibold mb-2 ml-1">Password</label>
            <div class="relative">
              <fa icon="lock" class="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input 
                v-model="form.password" 
                type="password" 
                placeholder="••••••••" 
                class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-white/20"
                required
              />
            </div>
            <p v-if="errors.password" class="text-rose-400 text-xs mt-2 ml-1">{{ errors.password[0] }}</p>
          </div>

          <div ref="el => loginItems[2] = el" class="pt-2">
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full bg-white text-indigo-900 py-4 rounded-2xl font-bold hover:bg-white/90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              <span v-if="loading" class="w-5 h-5 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin"></span>
              <span>{{ loading ? 'Authenticating...' : 'Sign In' }}</span>
            </button>
          </div>

          <div ref="el => loginItems[3] = el" class="text-center text-sm text-white/40 pt-2">
            Don't have an account? <NuxtLink to="/register" class="text-white font-bold hover:underline">Create one</NuxtLink>
          </div>
        </form>
        
        <div v-if="errors.server" class="mt-6 p-4 bg-rose-500/20 border border-rose-500/30 rounded-2xl text-rose-200 text-sm flex items-center gap-3">
          <fa icon="exclamation-triangle" />
          {{ errors.server[0] }}
        </div>
      </div>
    </div>
  </div>
</template>
