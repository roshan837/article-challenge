<template>
  <div>
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-[#1F3A40]">
      <div class="flex items-center justify-between px-4 h-14">
        <button
          @click="$router.back()"
          class="w-10 h-10 rounded-full hover:bg-gray-700 text-white">
          <svg
            class="w-5 h-5 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 class="text-lg font-semibold text-white">Article</h2>
        <button
          @click="toggleBookmark"
          class="w-10 h-10 rounded-full hover:bg-gray-700">
          <svg
            class="w-5 h-5 mx-auto"
            :class="
              isBookmarked ? 'text-red-500 fill-current' : 'text-gray-400'
            "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
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
    <div v-if="pending" class="p-6 max-w-4xl mx-auto">
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

    <!-- Error State -->
    <div v-else-if="error" class="p-6 text-center max-w-4xl mx-auto">
      <svg
        class="w-12 h-12 mx-auto text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Article not found</h3>
      <p class="text-gray-500 mb-6">
        The article you're looking for doesn't exist or has been removed.
      </p>
      <button
        @click="$router.back()"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Go Back
      </button>
    </div>

    <!-- Article Content -->
    <div v-else-if="data">
      <div class="flex flex-col bg-[#1F3A40] text-white p-6 lg:p-8 relative max-w-4xl mx-auto">
        <h1 class="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6">
          {{ data.title || "Untitled Article" }}
        </h1>
        <div class="text-sm lg:text-base text-gray-300 mb-28 lg:mb-32">
          <time>{{ getTimeAgo(data.publishedAt) }}</time>
        </div>
        <div
          class="absolute -bottom-16 lg:-bottom-20 self-center w-3/4 lg:w-2/3 h-40 lg:h-52 bg-gray-100 rounded-lg overflow-hidden">
          <img
            v-if="data.imageUrl"
            :src="data.imageUrl"
            :alt="data.title || 'Article image'"
            class="w-full h-full object-cover"
            @error="handleImageError" />
        </div>
      </div>
      <div class="bg-white p-6 lg:p-8 pt-24 lg:pt-28 max-w-4xl mx-auto">
        <div
          class="text-gray-700 text-base lg:text-lg leading-relaxed lg:leading-loose whitespace-pre-wrap"
          v-html="formatContent(data.content)"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const store = useArticlesStore();

// Get article from store
const articleId = route.params.id as string;
const data = computed(() => store.currentArticle);
const pending = computed(() => store.loadingState === "loading");
const error = computed(() => store.error);

// Load article if not already loaded
if (!data.value || data.value.id !== articleId) {
  await store.loadArticleById(articleId);
}

// Local state
const isBookmarked = ref(false);

// Methods
const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value;
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.style.display = "none";
};

const getTimeAgo = (date: any): string => {
  if (!date) return 'Recently published';
  
  const now = Date.now();
  const published = new Date(date).getTime();
  const diff = now - published;
  
  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}m ago`;
  
  const years = Math.floor(months / 12);
  return `${years}y ago`;
};

const formatContent = (content?: string): string => {
  if (!content) return "No content available.";
  return content.replace(/\n/g, "<br>");
};

// SEO
useSeoMeta({
  title: () => data.value?.title || "Article",
  description: () =>
    data.value?.excerpt?.substring(0, 160) || "Read this article",
});
</script>
