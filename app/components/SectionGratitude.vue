<script setup lang="ts">
const { locale, t } = useI18n()

const props = defineProps<{
  settings: WeddingSettings
}>()

const message = computed(() => localized(props.settings, 'gratitude_message', locale.value))
const groomName = computed(() => localized(props.settings, 'groom_name', locale.value))
const brideName = computed(() => localized(props.settings, 'bride_name', locale.value))
</script>

<template>
  <section class="py-20 px-4 bg-burgundy text-white">
    <h2 class="font-display text-3xl md:text-4xl text-center text-gold-light mb-12">
      {{ t('sections.gratitude') }}
    </h2>

    <div class="max-w-2xl mx-auto text-center">
      <p class="text-lg md:text-xl leading-relaxed text-white/90 whitespace-pre-line">
        {{ message }}
      </p>
      <p class="mt-8 font-display text-xl text-gold-light">
        {{ groomName }} &amp; {{ brideName }}
      </p>
    </div>
  </section>
</template>
