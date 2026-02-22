<script setup lang="ts">
const { locale, t } = useI18n()
const { assetUrl } = useDirectus()

const props = defineProps<{
  settings: WeddingSettings
  guestName?: string
}>()

const groomName = computed(() => localized(props.settings, 'groom_name', locale.value))
const brideName = computed(() => localized(props.settings, 'bride_name', locale.value))
const tagline = computed(() => localized(props.settings, 'tagline', locale.value))
const heroUrl = computed(() => assetUrl(props.settings.hero_image, { width: 1920, quality: 80 }))
</script>

<template>
  <section
    class="relative min-h-screen flex items-center justify-center text-center text-white"
  >
    <div
      class="absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${heroUrl})` }"
    />
    <div class="absolute inset-0 bg-black/40" />

    <div class="relative z-10 px-4 max-w-2xl">
      <p v-if="guestName" class="text-lg md:text-xl mb-6 text-gold-light">
        {{ t('hero.greeting', { name: guestName }) }}
      </p>

      <h1 class="font-display text-4xl md:text-6xl lg:text-7xl mb-4">
        {{ groomName }}
        <span class="block text-gold-light text-2xl md:text-3xl my-2">&amp;</span>
        {{ brideName }}
      </h1>

      <p class="text-lg md:text-xl text-white/90 mb-10">
        {{ tagline }}
      </p>

      <CountdownTimer :target-date="settings.wedding_date" />
    </div>
  </section>
</template>
