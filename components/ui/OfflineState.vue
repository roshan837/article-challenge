<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
    <!-- WiFi Icon -->
    <div class="w-20 h-20 mx-auto mb-6 text-gray-400">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />
      </svg>
    </div>
    
    <!-- Message -->
    <h2 class="text-2xl font-bold text-gray-900 mb-4">
      You are offline
    </h2>
    <p class="text-gray-600 mb-8">
      Please connect to internet and try again
    </p>
    
    <!-- Retry Button -->
    <button 
      @click="$emit('retry')"
      class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
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