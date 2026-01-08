import { defineStore } from "pinia";
import type { Article } from "~/models/domain";
import { LoadingState } from "~/types";
import { mapApiArticleToArticle } from "~/utils";

export const useArticlesStore = defineStore("articles", () => {
  const { fetchArticles } = useAPI();

  const allArticles = ref<Article[]>([]);
  const articles = ref<Article[]>([]);
  const currentArticle = ref<Article | null>(null);
  const loadingState = ref<LoadingState>(LoadingState.IDLE);
  const error = ref<string | null>(null);
  const hasMore = ref(true);
  const page = ref(0);
  const pageSize = 20;
  const isInitialized = ref(false);

  const initializeArticles = async () => {
    if (isInitialized.value) return;

    try {
      loadingState.value = LoadingState.LOADING;
      error.value = null;

      const apiArticles = await fetchArticles();
      allArticles.value = apiArticles.map(mapApiArticleToArticle);

      isInitialized.value = true;
      loadingState.value = LoadingState.SUCCESS;
    } catch (err) {
      loadingState.value = LoadingState.ERROR;
      error.value =
        err instanceof Error ? err.message : "Failed to load articles";
    }
  };

  const loadArticles = async (reset = false) => {
    await initializeArticles();

    if (reset) {
      page.value = 0;
      articles.value = [];
      hasMore.value = true;
    }

    if (!hasMore.value) return;

    const startIndex = page.value * pageSize;
    const endIndex = startIndex + pageSize;
    const pageArticles = allArticles.value.slice(startIndex, endIndex);

    if (!pageArticles.length) {
      hasMore.value = false;
      return;
    }

    articles.value = reset
      ? pageArticles
      : [...articles.value, ...pageArticles];
    page.value++;
    hasMore.value = pageArticles.length === pageSize;
  };

  const loadArticleById = async (id: string) => {
    await initializeArticles();

    const article = allArticles.value.find((article) => article.id === id);
    currentArticle.value = article || null;

    if (!article) {
      error.value = "Article not found";
    }
  };

  return {
    articles: readonly(articles),
    currentArticle: readonly(currentArticle),
    loadingState: readonly(loadingState),
    error: readonly(error),
    hasMore: readonly(hasMore),
    loadArticles,
    loadArticleById,
  };
});
