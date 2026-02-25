<script setup lang="ts">
const { locale } = useI18n()
const { getWeddingSettings, getCeremonies, getGallery, assetUrl } = useDirectus()

const { data: settings } = await useAsyncData('wedding-settings', () => getWeddingSettings())
const { data: ceremonies } = await useAsyncData('ceremonies', () => getCeremonies())
const { data: gallery } = await useAsyncData('gallery', () => getGallery())

const metaTitle = computed(() => settings.value ? localized(settings.value, 'meta_title', locale.value) : '')
const metaDescription = computed(() => settings.value ? localized(settings.value, 'meta_description', locale.value) : '')
const ogImage = computed(() => settings.value?.og_image ? assetUrl(settings.value.og_image, { width: 1200 }) : '')

useHead({
  title: metaTitle,
  htmlAttrs: { lang: locale },
})

useSeoMeta({
  title: metaTitle,
  description: metaDescription,
  ogTitle: metaTitle,
  ogDescription: metaDescription,
  ogImage: ogImage,
  ogType: 'website',
})
</script>

<template>
  <div v-if="settings">
    <BackgroundMusic v-if="settings.background_music" :file-id="settings.background_music" />
    <SectionHero :settings="settings" />
    <SectionCouple :settings="settings" />
    <SectionWelcoming :settings="settings" />
    <SectionCeremonies v-if="ceremonies?.length" :ceremonies="ceremonies" :settings="settings" />
    <SectionVenue :settings="settings" />
    <SectionGallery v-if="gallery?.length" :items="gallery" />
    <SectionGratitude :settings="settings" />
    <AppFooter :settings="settings" />
  </div>
</template>
