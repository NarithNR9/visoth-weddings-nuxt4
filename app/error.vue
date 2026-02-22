<script setup lang="ts">
import type { NuxtError } from '#app'

const { t } = useI18n()

const props = defineProps<{
  error: NuxtError
}>()

const is404 = computed(() => props.error.statusCode === 404)

function handleGoHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="min-h-screen bg-ivory flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <p class="text-6xl font-display text-gold mb-4">
        {{ error.statusCode }}
      </p>
      <h1 class="text-2xl text-charcoal mb-2">
        {{ is404 ? t('error.notFound') : t('error.title') }}
      </h1>
      <p v-if="error.message" class="text-charcoal/60 mb-8">
        {{ error.message }}
      </p>
      <button
        class="px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold-light transition-colors cursor-pointer"
        @click="handleGoHome"
      >
        {{ t('error.goHome') }}
      </button>
    </div>
  </div>
</template>
