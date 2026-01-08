<template>
  <div class="min-h-screen bg-gray-50">
    <CommonHeaderBar
      ref="headerRef"
      :view-mode="viewMode"
      @toggle-view="toggleViewMode"
      @toggle-search="toggleSearch"
      @search="handleSearch" />

    <main
      class="container-responsive py-4 sm:py-6 lg:py-8 safe-area-inset-bottom">
      <!-- Loading State -->
      <UiLoadingSkeleton
        v-if="
          store.loadingState === LoadingState.LOADING && !store.articles.length
        "
        :view-mode="viewMode"
        :count="8" />

      <!-- Offline State -->
      <UiOfflineState
        v-else-if="isOffline"
        @retry="handleRetry"
        class="py-12" />

      <!-- Articles List -->
      <CommonArticleList
        v-else
        :articles="filteredArticles"
        :loading="store.loadingState === LoadingState.LOADING"
        :error="store.error"
        :view-mode="viewMode"
        :has-more="store.hasMore" />

      <!-- Loading More Indicator -->
      <div
        v-if="
          store.loadingState === LoadingState.LOADING && store.articles.length
        "
        class="flex justify-center py-8">
        <div class="flex items-center space-x-2 text-gray-500">
          <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-sm">Loading more articles...</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { LoadingState } from "~/types";

const store = useArticlesStore();

// Reactive state
const viewMode = ref<"grid" | "list">("grid");
const isOffline = ref(false);
const searchQuery = ref("");
const headerRef = ref();

// Load initial articles
await store.loadArticles();

// Computed properties
const filteredArticles = computed(() => {
  if (!searchQuery.value.trim()) return store.articles;

  const query = searchQuery.value.toLowerCase().trim();
  return store.articles.filter(
    (article) =>
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.author.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
  );
});

// View mode persistence
const toggleViewMode = () => {
  viewMode.value = viewMode.value === "grid" ? "list" : "grid";
  // Persist view mode preference
  if (process.client) {
    localStorage.setItem("articles-view-mode", viewMode.value);
  }
};

// Search functionality
const toggleSearch = () => {
  // Handled by HeaderBar component
};

const handleSearch = (query: string) => {
  searchQuery.value = query;
};

// Retry functionality
const handleRetry = async () => {
  isOffline.value = false;
  await store.loadArticles(true);
};

// Infinite scroll with throttling
let scrollTimeout: NodeJS.Timeout;
const handleScroll = () => {
  if (scrollTimeout) return;

  scrollTimeout = setTimeout(() => {
    const { scrollY, innerHeight } = window;
    const { offsetHeight } = document.body;

    if (scrollY + innerHeight >= offsetHeight - 1000) {
      if (
        store.hasMore &&
        store.loadingState !== LoadingState.LOADING &&
        !searchQuery.value
      ) {
        store.loadArticles();
      }
    }

    scrollTimeout = null as any;
  }, 100);
};

// Network status monitoring
const updateOnlineStatus = () => {
  isOffline.value = !navigator.onLine;
  if (navigator.onLine && store.articles.length) {
    store.loadArticles(true);
  }
};

// Lifecycle hooks
onMounted(() => {
  // Restore view mode preference
  if (process.client) {
    const savedViewMode = localStorage.getItem("articles-view-mode");
    if (savedViewMode === "list" || savedViewMode === "grid") {
      viewMode.value = savedViewMode;
    }
  }

  // Event listeners
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);

  // Initial network status check
  updateOnlineStatus();
});

onUnmounted(() => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("online", updateOnlineStatus);
  window.removeEventListener("offline", updateOnlineStatus);
});

// SEO and meta
useHead({
  title: "Articles - Latest News & Stories",
  meta: [
    {
      name: "description",
      content:
        "Discover the latest articles, news, and stories. Stay updated with fresh content from various topics and authors.",
    },
    { name: "keywords", content: "articles, news, stories, blog, content" },
    { property: "og:title", content: "Articles - Latest News & Stories" },
    {
      property: "og:description",
      content:
        "Discover the latest articles, news, and stories. Stay updated with fresh content from various topics and authors.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
</script>
