<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 safe-area-inset-top">
    <div class="container-responsive">
      <div class="flex items-center justify-between h-14 sm:h-16">
        <!-- Title -->
        <h1 class="text-responsive-lg font-bold text-gray-900 truncate">
          Articles
        </h1>
        
        <!-- Actions -->
        <div class="flex items-center gap-1 sm:gap-2">
          <!-- View Toggle -->
          <button
            @click="$emit('toggle-view')"
            class="btn-ghost tap-target"
            :aria-label="viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'"
          >
            <!-- Grid Icon -->
            <svg 
              v-if="viewMode === 'list'" 
              class="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <!-- List Icon -->
            <svg 
              v-else 
              class="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          
          <!-- Search Button -->
          <button
            @click="toggleSearch"
            class="btn-ghost tap-target"
            :aria-label="searchExpanded ? 'Close search' : 'Search articles'"
          >
            <svg 
              v-if="!searchExpanded"
              class="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <svg 
              v-else
              class="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Search Bar (Expandable) -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="searchExpanded" class="pb-4">
          <div class="relative">
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="Search articles..."
              class="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              @keydown.escape="closeSearch"
            >
            <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  viewMode: 'grid' | 'list'
}>()

const emit = defineEmits<{
  'toggle-view': []
  'toggle-search': []
  'search': [query: string]
}>()

const searchExpanded = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement>()

// Watch for search toggle
watch(() => searchExpanded.value, (expanded) => {
  if (expanded) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  } else {
    searchQuery.value = ''
    emit('search', '') // Clear search when closing
  }
})

// Watch for search query changes
watch(searchQuery, (query) => {
  emit('search', query)
})

// Handle search toggle
const toggleSearch = () => {
  searchExpanded.value = !searchExpanded.value
  emit('toggle-search')
}

const closeSearch = () => {
  searchExpanded.value = false
  emit('toggle-search')
}

// Listen to toggle-search event
const handleToggleSearch = () => {
  toggleSearch()
}

// Expose methods for parent component
defineExpose({
  toggleSearch: handleToggleSearch
})
</script>