export enum LoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface ApiError {
  message: string
  statusCode?: number
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
}