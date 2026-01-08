<template>
  <div 
    class="animate-fade-in"
    :class="{
      'grid-articles': viewMode === 'grid',
      'space-y-3 sm:space-y-4': viewMode === 'list'
    }"
  >
    <div 
      v-for="n in count" 
      :key="n"
      class="card overflow-hidden"
      :class="{
        'flex gap-3 sm:gap-4': viewMode === 'list',
        'block': viewMode === 'grid'
      }"
      :style="{ animationDelay: `${n * 100}ms` }"
    >
      <!-- Image Skeleton -->
      <div 
        class="skeleton flex-shrink-0"
        :class="{
          'w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-lg': viewMode === 'list',
          'w-full aspect-[4/3] rounded-t-xl': viewMode === 'grid'
        }"
      />
      
      <!-- Content Skeleton -->
      <div 
        class="flex-1 min-w-0"
        :class="{
          'py-1': viewMode === 'list',
          'p-4 sm:p-5': viewMode === 'grid'
        }"
      >
        <!-- Date & Author -->
        <div class="flex items-center mb-2">
          <div 
            class="skeleton-text"
            :class="{
              'w-16': viewMode === 'list',
              'w-20': viewMode === 'grid'
            }"
          />
          <div v-if="viewMode === 'grid'" class="w-1 h-1 bg-gray-300 rounded-full mx-2" />
          <div v-if="viewMode === 'grid'" class="skeleton-text w-16" />
        </div>
        
        <!-- Title -->
        <div class="space-y-2 mb-3">
          <div 
            class="skeleton-title"
            :class="{
              'w-full': viewMode === 'grid',
              'w-4/5': viewMode === 'list'
            }"
          />
          <div 
            class="skeleton-title"
            :class="{
              'w-3/4': viewMode === 'grid',
              'w-2/3': viewMode === 'list'
            }"
          />
        </div>
        
        <!-- Excerpt (Grid only) -->
        <div v-if="viewMode === 'grid'" class="space-y-2 mb-4">
          <div class="skeleton-text w-full" />
          <div class="skeleton-text w-full" />
          <div class="skeleton-text w-2/3" />
        </div>
        
        <!-- Footer -->
        <div class="flex items-center justify-between">
          <div 
            class="skeleton rounded-md"
            :class="{
              'h-5 w-12': viewMode === 'list',
              'h-6 w-16': viewMode === 'grid'
            }"
          />
          <div 
            class="skeleton-text"
            :class="{
              'w-16': viewMode === 'list',
              'w-20': viewMode === 'grid'
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  count?: number
  viewMode?: 'grid' | 'list'
}>(), {
  count: 8,
  viewMode: 'grid'
})
</script>