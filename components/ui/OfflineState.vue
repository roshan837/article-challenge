<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
    <!-- Offline Icon -->
    <div class="w-16 h-16 sm:w-20 sm:h-20 mb-6 text-gray-400">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="1.5" 
          d="M18.364 5.636l-12.728 12.728m0 0L12 12m-6.364 6.364L12 12m6.364-6.364L12 12M3 12a9 9 0 1118 0 9 9 0 01-18 0z" 
        />
      </svg>
    </div>
    
    <!-- Message -->
    <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
      You're offline
    </h2>
    <p class="text-gray-600 mb-8 max-w-sm">
      Check your internet connection and try again.
    </p>
    
    <!-- Retry Button -->
    <button 
      @click="$emit('retry')"
      class="btn-primary px-6 py-3 text-sm sm:text-base"
    >
      Try Again
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  retry: []
}>()
</script>