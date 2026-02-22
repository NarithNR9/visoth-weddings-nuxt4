<script setup lang="ts">
const { locale, t } = useI18n()

const props = defineProps<{
  settings: WeddingSettings
}>()

const formattedDate = computed(() => {
  const date = new Date(props.settings.wedding_date)
  return new Intl.DateTimeFormat(locale.value === 'km' ? 'km-KH' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
})

const venueName = computed(() => localized(props.settings, 'venue_name', locale.value))
</script>

<template>
  <section class="py-20 px-4 bg-blush/30">
    <h2 class="font-display text-3xl md:text-4xl text-center text-burgundy mb-12">
      {{ t('sections.dateTime') }}
    </h2>

    <div class="max-w-lg mx-auto text-center space-y-4">
      <p class="text-2xl md:text-3xl text-charcoal font-display">
        {{ formattedDate }}
      </p>
      <p class="text-xl text-gold">
        {{ settings.wedding_time }}
      </p>
      <p class="text-lg text-charcoal/70">
        {{ venueName }}
      </p>
    </div>
  </section>
</template>
