<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white selection:bg-purple-500/30">
    <!-- Navbar -->
    <nav class="p-6 flex justify-between items-center backdrop-blur-md bg-white/5 border-b border-white/10 sticky top-0 z-50">
      <div class="flex items-center gap-3 group cursor-pointer" @click="navigateTo('/')">
        <div class="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
          <fa icon="dashboard" class="text-white" />
        </div>
        <span class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">SaaS App</span>
      </div>
      <div class="flex gap-4">
        <NuxtLink to="/login" class="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 font-medium">Login</NuxtLink>
        <NuxtLink to="/register" class="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 font-semibold">Join Now</NuxtLink>
      </div>
    </nav>

    <main class="container mx-auto px-4 py-12">
      <slot />
    </main>

    <footer class="mt-auto py-8 border-t border-white/10 bg-white/5 backdrop-blur-md text-center text-white/40 text-sm">
      &copy; 2026 SaaS Application. Built with Nuxt 4 & Laravel 12.
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
