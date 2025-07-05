<script setup lang="ts">
import LoadingSpinner from './LoadingSpinner.vue'

interface Props {
  isVisible: boolean
  text?: string
  spinnerSize?: 'small' | 'medium' | 'large'
  backgroundColor?: string
  overlayClass?: string
}

const {
  isVisible,
  text = '',
  spinnerSize = 'large',
  backgroundColor = 'rgba(0, 0, 0, 0.5)',
  overlayClass = ''
} = defineProps<Props>()
</script>

<template>
  <div 
    v-if="isVisible"
    :class="[
      'loading-overlay fixed inset-0 z-50 flex items-center justify-center',
      overlayClass
    ]"
    :style="{ backgroundColor: backgroundColor }"
  >
    <div class="loading-content bg-white rounded-lg p-6 shadow-lg">
      <LoadingSpinner 
        :size="spinnerSize" 
        :text="text"
        container-class="flex-col"
      />
    </div>
  </div>
</template>

<style scoped>
.loading-overlay {
  backdrop-filter: blur(2px);
}
</style>