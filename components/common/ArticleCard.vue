<template>
  <article
    class="card-interactive group block"
    @click="navigateToArticle"
    @keydown.enter="navigateToArticle"
    @keydown.space.prevent="navigateToArticle"
    tabindex="0"
    role="button"
    :aria-label="`Read article: ${article.title}`">
    <!-- Image Container -->
    <div
      class="relative overflow-hidden bg-gray-100"
      :class="{
        'w-full h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] rounded-t-lg':
          viewMode === 'list',
        'w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-t-xl': viewMode === 'grid',
      }">
      <img
        :src="article.imageUrl"
        :alt="article.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        @load="handleImageLoad"
        @error="handleImageError"
        loading="lazy" />

      <!-- Image Overlay -->
      <div
        class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"
        :class="{
          'rounded-t-lg': viewMode === 'list',
          'rounded-t-xl': viewMode === 'grid',
        }" />
    </div>

    <!-- Content -->
    <div class="p-3 sm:p-4">
      <!-- Title -->
      <h2
        class="font-semibold group-hover:text-primary-600 transition-colors duration-200 text-clamp-2 leading-tight"
        :class="{
          'text-sm mb-3': viewMode === 'list',
          'text-lg sm:text-xl mb-2': viewMode === 'grid',
        }">
        {{ article.title }}
      </h2>

      <!-- Footer (List mode only) -->
      <div v-if="viewMode === 'list'" class="flex items-center justify-between">
        <!-- Date -->
        <div class="flex items-center text-xs">
          <svg
            class="w-3 h-3 mr-1.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <time class="truncate">{{ article.formattedDate }}</time>
        </div>

        <!-- Read More -->
        <a
          :href="article.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center bg-[#1F4E79] font-medium transition-colors duration-200 focus-ring rounded-md text-xs px-2 py-1"
          @click.stop>
          <span>Read more</span>
          <svg
            class="w-3 h-3 ml-1 transition-transform group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Article } from "~/models/domain";

const props = withDefaults(
  defineProps<{
    article: Article;
    viewMode?: "grid" | "list";
  }>(),
  {
    viewMode: "grid",
  }
);

const imageLoaded = ref(false);

const handleImageLoad = () => {
  imageLoaded.value = true;
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNDQgMTEySDEzNlYxMDRIMTQ0VjExMlpNMTc2IDEyOEgxNDRWMTM2SDE3NlYxMjhaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=";
  imageLoaded.value = true;
};

const navigateToArticle = () => {
  navigateTo(`/article-${props.article.id}`);
};
</script>
