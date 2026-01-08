import type { ApiResponse, ApiArticle } from '~/models/api'
import type { ApiError } from '~/types'

const API_BASE_URL: string = 'https://mocki.io/v1/52930ca2-656e-4c3c-9eab-8ad842fe0cc4'

export const useAPI = () => {
  const fetchArticles = async (): Promise<ApiArticle[]> => {
    try {
      const { data } = await useFetch<ApiResponse>(API_BASE_URL)
      return data.value?.articles || []
    } catch (err: unknown) {
      const apiError: ApiError = {
        message: 'Unable to load articles. Please try again later.',
        statusCode: 500,
      }
      throw apiError
    }
  }

  return {
    fetchArticles,
  }
}
