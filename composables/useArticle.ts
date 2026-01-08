export const useArticle = (id: string) => {
  return useFetch(`/api/articles/${id}`, {
    key: `article-${id}`,
    transform: (data: any) => ({
      id: data.id,
      title: data.title || null,
      content: data.content || null,
      imageUrl: data.imageUrl || data.image || null,
      publishedAt: data.publishedAt || data.createdAt || null,
      author: data.author || null
    }),
    onResponseError({ response }) {
      throw createError({
        statusCode: response.status,
        statusMessage: response.status === 404 ? 'Article not found' : 'Failed to load article'
      })
    }
  })
}