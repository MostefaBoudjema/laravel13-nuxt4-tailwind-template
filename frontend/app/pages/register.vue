<script setup lang="ts">
import { gsap } from 'gsap'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'default',
  middleware: 'guest'
})

const auth = useAuthStore()
const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})
const loading = ref(false)
const errors = ref<Record<string, string[]>>({})

const regBox = ref()
const regItems = ref([])

onMounted(() => {
  gsap.from(regBox.value, {
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: 'elastic.out(1, 0.8)'
  })
  
  gsap.from(regItems.value, {
    opacity: 0,
    x: 30,
    stagger: 0.1,
    duration: 0.8,
    delay: 0.3
  })
})

const handleRegister = async () => {
  loading.value = true
  errors.value = {}
  
  try {
    const response = await $fetch<{ token: string, user: any }>('/register', {
      method: 'POST',
      baseURL: useRuntimeConfig().public.apiBase,
      body: form
    })
    
    auth.setToken(response.token)
    auth.setUser(response.user)
    
    navigateTo('/')
  } catch (e: any) {
    if (e.response?._data?.errors) {
      errors.value = e.response._data.errors
    } else {
      errors.value = { server: [e.message || 'Registration failed'] }
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-[70vh]">
    <div ref="regBox" class="w-full max-w-xl p-10 rounded-3xl bg-white text-slate-900 shadow-2xl relative overflow-hidden">
      <!-- Decor -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-0"></div>
      
      <div class="relative z-10">
        <h2 class="text-3xl font-bold mb-8 flex items-center gap-3">
          <span class="w-12 h-1 bg-indigo-600 rounded-full"></span>
          Join the SaaS
        </h2>

        <form @submit.prevent="handleRegister" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div ref="el => regItems[0] = el">
            <label class="block text-sm font-semibold mb-2">Full Name</label>
            <input v-model="form.name" type="text" placeholder="John Doe" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
            <p v-if="errors.name" class="text-rose-500 text-xs mt-1">{{ errors.name[0] }}</p>
          </div>

          <div ref="el => regItems[1] = el">
            <label class="block text-sm font-semibold mb-2">Email Address</label>
            <input v-model="form.email" type="email" placeholder="john@example.com" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
            <p v-if="errors.email" class="text-rose-500 text-xs mt-1">{{ errors.email[0] }}</p>
          </div>

          <div ref="el => regItems[2] = el">
            <label class="block text-sm font-semibold mb-2">Password</label>
            <input v-model="form.password" type="password" placeholder="••••••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
            <p v-if="errors.password" class="text-rose-500 text-xs mt-1">{{ errors.password[0] }}</p>
          </div>

          <div ref="el => regItems[3] = el">
            <label class="block text-sm font-semibold mb-2">Confirm Password</label>
            <input v-model="form.password_confirmation" type="password" placeholder="••••••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
          </div>

          <div ref="el => regItems[4] = el" class="md:col-span-2 pt-4">
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
            >
              <fa v-if="loading" icon="cog" class="animate-spin" />
              <span>{{ loading ? 'Creating account...' : 'Create Account' }}</span>
            </button>
          </div>

          <div class="md:col-span-2 text-center text-sm text-slate-500">
            Already have an account? <NuxtLink to="/login" class="text-indigo-600 font-bold hover:underline">Sign In</NuxtLink>
          </div>
        </form>

        <div v-if="errors.server" class="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-sm flex items-center gap-3">
          <fa icon="exclamation-triangle" />
          {{ errors.server[0] }}
        </div>
      </div>
    </div>
  </div>
</template>
