export interface Article {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  publishedAt: Date
  imageUrl: string
  tags: string[]
  category: string
  formattedDate: string
  formattedContent: string
  url: string
}