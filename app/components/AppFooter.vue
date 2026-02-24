<script setup lang="ts">
const { locale, t } = useI18n()

const props = defineProps<{
  settings: WeddingSettings
}>()

const groomName = computed(() => localized(props.settings, 'groom_name', locale.value))
const brideName = computed(() => localized(props.settings, 'bride_name', locale.value))
const year = computed(() => new Date(props.settings.wedding_date).getFullYear())
</script>

<template>
  <footer class="p-3 bg-charcoal text-white/60 text-center text-sm">
    <p>{{ year }}</p>
    <p class="mt-2">{{ t('footer.madeWith') }}</p>
  </footer>
</template>
