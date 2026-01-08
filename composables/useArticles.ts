import type { Article } from '~/models/domain'
import { LoadingState } from '~/types'

export const useArticles = () => {
  const store = useArticlesStore()
  
  return {
    articles: store.articles,
    currentArticle: store.currentArticle,
    loadingState: store.loadingState,
    error: store.error,
    hasMore: store.hasMore,
    loadArticles: store.loadArticles,
    loadArticleById: store.loadArticleById
  }
}
