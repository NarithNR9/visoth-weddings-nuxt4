<script setup lang="ts">
const { locale, setLocale, t } = useI18n()

function toggle() {
  setLocale(locale.value === 'km' ? 'en' : 'km')
}
</script>

<template>
  <div class="fixed top-0 right-0 z-50 p-2">
    <button
      class="px-4 py-2 bg-white/90 backdrop-blur-sm text-charcoal text-sm rounded-full shadow-md hover:bg-white transition-colors cursor-pointer"
      @click="toggle"
    >
      {{ t('language.switch') }}
    </button>
  </div>
</template>
