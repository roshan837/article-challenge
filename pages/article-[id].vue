<template>
  <div>
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-[#1F3A40]" role="banner">
      <div class="flex items-center justify-between px-4 h-14">
        <button
          @click="$router.back()"
          class="w-10 h-10 rounded-full hover:bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1F3A40]"
          aria-label="Go back to articles list"
          type="button">
          <svg
            class="w-5 h-5 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-lg font-semibold text-white">Article</h1>
        <button
          @click="toggleBookmark"
          class="w-10 h-10 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1F3A40]"
          :aria-label="isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'"
          :aria-pressed="isBookmarked"
          type="button">
          <svg
            class="w-5 h-5 mx-auto"
            :class="
              isBookmarked ? 'text-red-500 fill-current' : 'text-gray-400'
            "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="pending" class="p-6 max-w-4xl mx-auto" role="status" aria-live="polite">
      <span class="sr-only">Loading article content...</span>
      <div class="animate-pulse">
        <div class="bg-gray-300 p-6 lg:p-8 rounded-t-lg">
          <div class="h-8 lg:h-10 bg-gray-400 rounded mb-3"></div>
          <div class="h-4 bg-gray-400 rounded w-24 mb-6"></div>
        </div>
        <div class="bg-white p-6 lg:p-8 pt-20 lg:pt-24 rounded-b-lg">
          <div class="space-y-3">
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error/Offline State -->
    <div v-else-if="error" class="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center max-w-4xl mx-auto" role="alert" aria-live="assertive">
      <div class="w-20 h-20 mx-auto mb-6 text-gray-400" aria-hidden="true">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-4">You are offline</h2>
      <p class="text-gray-600 mb-8">
        Please connect to internet and try again
      </p>
      <button
        @click="handleRetry"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
        type="button">
        Retry
      </button>
    </div>

    <!-- Article Content -->
    <main v-else-if="data" role="main">
      <article>
        <header class="flex flex-col bg-[#1F3A40] text-white p-6 lg:p-8 relative max-w-4xl mx-auto">
          <h1 class="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6" id="article-title">
            {{ data.title || "Untitled Article" }}
          </h1>
          <div class="text-sm lg:text-base text-gray-300 mb-28 lg:mb-32">
            <time :datetime="data.publishedAt" class="block">
              Published: {{ data.formattedDate }}
            </time>
            <span v-if="data.author" class="block mt-1">
              By: {{ data.author }}
            </span>
          </div>
          <figure
            class="absolute aspect-[4/3] -bottom-16 lg:-bottom-20 self-center w-3/4 lg:w-2/3 h-40 lg:h-52 bg-gray-100 rounded-lg overflow-hidden"
            v-if="data.imageUrl">
            <img
              :src="data.imageUrl"
              :alt="data.title ? `Image for article: ${data.title}` : 'Article image'"
              class="w-full h-full object-cover"
              @error="handleImageError" />
          </figure>
        </header>
        <div class="bg-white p-6 lg:p-8 pt-24 lg:pt-28 max-w-4xl mx-auto">
          <div
            class="text-gray-700 text-base lg:text-lg leading-relaxed lg:leading-loose prose prose-lg max-w-none"
            v-html="data.formattedContent"
            role="region"
            aria-labelledby="article-title"></div>
          
          <!-- External Link -->
          <div class="mt-8 pt-6 border-t border-gray-200" v-if="data.url">
            <a
              :href="data.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors"
              :aria-describedby="data.title ? 'external-link-desc' : undefined">
              <span>Read full article</span>
              <svg
                class="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <p id="external-link-desc" class="text-sm text-gray-500 mt-2" v-if="data.title">
              Opens {{ data.title }} in a new tab
            </p>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '~/models/domain'
import { LoadingState } from '~/types'

const route = useRoute()
const store = useArticlesStore()

// Get article from store
const articleId = route.params.id as string
const data = computed<Article | null>(() => store.currentArticle)
const pending = computed<boolean>(() => store.loadingState === LoadingState.LOADING)
const error = computed<string | null>(() => store.error)

// Load article if not already loaded
if (!data.value || data.value.id !== articleId) {
  await store.loadArticleById(articleId)
}

// Local state
const isBookmarked = ref<boolean>(false)

const handleRetry = async (): Promise<void> => {
  await store.loadArticleById(articleId)
}

// Methods
const toggleBookmark = (): void => {
  isBookmarked.value = !isBookmarked.value
}

const handleImageError = (event: Event): void => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}

// SEO
useSeoMeta({
  title: () => data.value?.title || 'Article',
  description: () =>
    data.value?.excerpt?.substring(0, 160) || 'Read this article',
})
</script>
