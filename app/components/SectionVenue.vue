<script setup lang="ts">
const { locale, t } = useI18n()
const { assetUrl } = useDirectus()

const props = defineProps<{
  settings: WeddingSettings
}>()

const venueName = computed(() => localized(props.settings, 'venue_name', locale.value))
const venueAddress = computed(() => localized(props.settings, 'venue_address', locale.value))
const qrUrl = computed(() => assetUrl(props.settings.venue_qr_code, { width: 200 }))
</script>

<template>
  <section class="py-20 px-4 bg-blush/30">
    <h2 class="font-display text-3xl md:text-4xl text-center text-burgundy mb-12">
      {{ t('sections.venue') }}
    </h2>

    <div class="max-w-lg mx-auto text-center space-y-6">
      <h3 class="font-display text-2xl text-charcoal">
        {{ venueName }}
      </h3>
      <p class="text-charcoal/70 whitespace-pre-line">
        {{ venueAddress }}
      </p>

      <div v-if="settings.venue_qr_code" class="flex justify-center">
        <img
          :src="qrUrl"
          alt="Venue QR Code"
          class="w-40 h-40 rounded-lg shadow-md"
        />
      </div>

      <a
        v-if="settings.venue_map_url"
        :href="settings.venue_map_url"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold-light transition-colors"
      >
        {{ t('venue.directions') }}
      </a>
    </div>
  </section>
</template>
