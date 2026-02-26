<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()
const { getWeddingSettings, getCeremonies, getGallery, getGuest, assetUrl } = useDirectus()

const guestId = route.params.id as string

const { data: settings } = await useAsyncData('wedding-settings', () => getWeddingSettings())
const { data: ceremonies } = await useAsyncData('ceremonies', () => getCeremonies())
const { data: gallery } = await useAsyncData('gallery', () => getGallery())
const { data: guest, error: guestError } = await useAsyncData(`guest-${guestId}`, () => getGuest(guestId))

if (guestError.value || !guest.value) {
  throw createError({ statusCode: 404, statusMessage: 'Guest not found' })
}

const guestName = computed(() => guest.value ? localized(guest.value, 'name', locale.value) : '')

const isOpened = ref(false)
const musicRef = ref<{ play: () => void } | null>(null)

async function handleOpen() {
  isOpened.value = true
  await nextTick()
  musicRef.value?.play()
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
}

const metaTitle = computed(() => settings.value ? localized(settings.value, 'meta_title', locale.value) : '')
const metaDescription = computed(() => settings.value ? localized(settings.value, 'meta_description', locale.value) : '')

const pageTitle = computed(() =>
  guestName.value ? `${metaTitle.value} | ${$t("hero.greeting")} ${guestName.value}` : metaTitle.value
)

// Use width:1200 height:630 (OG standard) and format:jpg for broadest platform support
const ogImage = computed(() =>
  settings.value?.og_image
    ? assetUrl(settings.value.og_image, { width: 1200, height: 630, quality: 85 })
    : ''
)

useHead({
  title: pageTitle,
  htmlAttrs: { lang: locale },
})

useSeoMeta({
  title: pageTitle,
  description: metaDescription,
  ogTitle: pageTitle,
  ogDescription: metaDescription,
  ogImage: ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/jpeg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: metaDescription,
  twitterImage: ogImage,
})
</script>

<template>
  <div v-if="settings">
    <BackgroundMusic v-if="settings.background_music && isOpened" ref="musicRef" :file-id="settings.background_music" />
    <SectionHero :settings="settings" :guest-name="guestName" :opened="isOpened" @open="handleOpen" />

    <Transition name="reveal">
      <div v-if="isOpened">
        <SectionCouple :settings="settings" />
        <SectionWelcoming :settings="settings" />
        <SectionCeremonies v-if="ceremonies?.length" :ceremonies="ceremonies" :settings="settings" />
        <SectionVenue :settings="settings" />
        <SectionGallery v-if="gallery?.length" :items="gallery" />
        <SectionGratitude :settings="settings" />
        <AppFooter :settings="settings" />
      </div>
    </Transition>
  </div>
</template>
