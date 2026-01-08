import { defineStore } from 'pinia'
import type { Article } from '~/models/domain'
import type { ApiArticle } from '~/models/api'
import { LoadingState } from '~/types'
import { mapApiArticleToArticle } from '~/utils'

export const useArticlesStore = defineStore('articles', () => {
  const { fetchArticles } = useAPI()

  const allArticles = ref<Article[]>([])
  const articles = ref<Article[]>([])
  const currentArticle = ref<Article | null>(null)
  const loadingState = ref<LoadingState>(LoadingState.IDLE)
  const error = ref<string | null>(null)
  const hasMore = ref<boolean>(true)
  const page = ref<number>(0)
  const pageSize: number = 20
  const isInitialized = ref<boolean>(false)

  const initializeArticles = async (): Promise<void> => {
    if (isInitialized.value) return

    try {
      loadingState.value = LoadingState.LOADING
      error.value = null

      const apiArticles: ApiArticle[] = await fetchArticles()
      allArticles.value = apiArticles.map(mapApiArticleToArticle)

      isInitialized.value = true
      loadingState.value = LoadingState.SUCCESS
    } catch (err: unknown) {
      loadingState.value = LoadingState.ERROR
      error.value =
        err instanceof Error ? err.message : 'Failed to load articles'
    }
  }

  const loadArticles = async (reset: boolean = false): Promise<void> => {
    await initializeArticles()

    if (reset) {
      page.value = 0
      articles.value = []
      hasMore.value = true
    }

    if (!hasMore.value) return

    const startIndex: number = page.value * pageSize
    const endIndex: number = startIndex + pageSize
    const pageArticles: Article[] = allArticles.value.slice(startIndex, endIndex)

    if (!pageArticles.length) {
      hasMore.value = false
      return
    }

    articles.value = reset
      ? pageArticles
      : [...articles.value, ...pageArticles]
    page.value++
    hasMore.value = pageArticles.length === pageSize
  }

  const loadArticleById = async (id: string): Promise<void> => {
    await initializeArticles()

    const article: Article | undefined = allArticles.value.find((article: Article) => article.id === id)
    currentArticle.value = article || null

    if (!article) {
      error.value = 'Article not found'
    }
  }

  return {
    articles: (articles),
    currentArticle: (currentArticle),
    loadingState: (loadingState),
    error: (error),
    hasMore: (hasMore),
    loadArticles,
    loadArticleById,
  }
})
