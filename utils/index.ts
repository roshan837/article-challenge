import type { ApiArticle } from '~/models/api'
import type { Article } from '~/models/domain'

export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return 'Unknown date'
  }
}

export function mapApiArticleToArticle(apiArticle: ApiArticle, index: number): Article {
  return {
    id: index.toString(),
    title: apiArticle.title || 'Untitled',
    content: apiArticle.content || apiArticle.description || '',
    excerpt: apiArticle.description || '',
    author: apiArticle.author || 'Unknown Author',
    publishedAt: apiArticle.publishedAt ? new Date(apiArticle.publishedAt) : new Date(),
    imageUrl: apiArticle.urlToImage || '',
    tags: [],
    category: apiArticle.source.name || 'General',
    formattedDate: formatDate(apiArticle.publishedAt || '')
  }
}