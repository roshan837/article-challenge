<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
    <!-- Icon -->
    <div class="w-16 h-16 sm:w-20 sm:h-20 mb-6 text-gray-300">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="1.5" 
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
        />
      </svg>
    </div>
    
    <!-- Content -->
    <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
      {{ title }}
    </h2>
    <p class="text-gray-600 max-w-sm">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
}

defineProps<Props>()
</script>