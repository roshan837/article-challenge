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

export function getTimeFromNow(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return `${diffDays}d ago`
}

export function formatContent(content?: string): string {
  if (!content) return "No content available."
  return content.replace(/\n/g, "<br>")
}

export function mapApiArticleToArticle(apiArticle: ApiArticle, index: number): Article {
  const publishedDate = apiArticle.publishedAt ? new Date(apiArticle.publishedAt) : new Date()
  const title = (apiArticle.title || 'Untitled').trim()
  const imageUrl = apiArticle.urlToImage || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xODAgMTMwSDE2MFYxMTBIMTgwVjEzMFpNMjQwIDE2MEgxODBWMTcwSDI0MFYxNjBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTkwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K'
  const formattedDate = getTimeFromNow(publishedDate)
  const content = apiArticle.content || apiArticle.description || ''
  const formattedContent = formatContent(content)
  const url = apiArticle.url
  
  return {
    id: index.toString(),
    title,
    content,
    excerpt: apiArticle.description || '',
    author: apiArticle.author || 'Unknown Author',
    publishedAt: publishedDate,
    imageUrl,
    tags: [],
    category: apiArticle.source.name || 'General',
    formattedDate,
    formattedContent,
    url
  }
}