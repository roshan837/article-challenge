<template>
  <div class="space-responsive">
    <!-- Loading State -->
    <UiLoadingSpinner v-if="loading" class="py-12" />
    
    <!-- Error State -->
    <UiErrorMessage v-else-if="error" :message="error" class="py-12" />
    
    <!-- Empty State -->
    <UiEmptyState 
      v-else-if="!articles?.length" 
      @retry="$emit('retry')"
      class="py-12"
    />
    
    <!-- Articles Grid/List -->
    <div 
      v-else 
      class="animate-fade-in"
      :class="{
        'grid-articles': viewMode === 'grid',
        'grid-articles-list': viewMode === 'list'
      }"
    >
      <CommonArticleCard 
        v-for="(article, index) in articles" 
        :key="article.id" 
        :article="article" 
        :view-mode="viewMode"
        :style="{ animationDelay: `${index * 50}ms` }"
        class="animate-slide-up"
      />
    </div>
    
    <!-- Load More Indicator -->
    <div v-if="hasMore && !loading" class="flex justify-center pt-8">
      <div class="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
        Scroll for more articles
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '~/models/domain'

defineEmits<{
  retry: []
}>()

withDefaults(defineProps<{
  articles: Article[]
  loading?: boolean
  error?: string | null
  viewMode?: 'grid' | 'list'
  hasMore?: boolean
}>(), {
  loading: false,
  error: null,
  viewMode: 'grid',
  hasMore: false
})
</script>