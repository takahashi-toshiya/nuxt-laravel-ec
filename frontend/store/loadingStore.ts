import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    isLoading: false,
    loadingMessage: ''
  }),
  
  actions: {
    showLoading(message: string = '読み込み中...') {
      this.isLoading = true
      this.loadingMessage = message
    },
    
    hideLoading() {
      this.isLoading = false
      this.loadingMessage = ''
    },
    
    async withLoading<T>(fn: () => Promise<T>, message?: string): Promise<T> {
      this.showLoading(message)
      try {
        const result = await fn()
        return result
      } finally {
        this.hideLoading()
      }
    }
  }
})