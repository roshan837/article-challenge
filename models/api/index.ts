export interface ApiSource {
  id: string | null
  name: string
}

export interface ApiArticle {
  source: ApiSource
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

export interface ApiResponse {
  status: string
  totalResults: number
  articles: ApiArticle[]
}