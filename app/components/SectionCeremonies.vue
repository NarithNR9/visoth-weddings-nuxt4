<script setup lang="ts">
const { locale, t } = useI18n()

defineProps<{
  ceremonies: Ceremony[]
}>()
</script>

<template>
  <section class="py-20 px-4 bg-white">
    <h2 class="font-display text-3xl md:text-4xl text-center text-burgundy mb-16">
      {{ t('sections.ceremonies') }}
    </h2>

    <div class="max-w-2xl mx-auto relative">
      <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gold-light md:-translate-x-px" />

      <div
        v-for="(ceremony, i) in ceremonies"
        :key="ceremony.id"
        class="relative pl-12 md:pl-0 mb-12 last:mb-0"
        :class="i % 2 === 0 ? 'md:pr-[calc(50%+2rem)] md:text-right' : 'md:pl-[calc(50%+2rem)]'"
      >
        <div
          class="absolute left-2.5 md:left-1/2 top-1 w-3 h-3 rounded-full bg-gold border-2 border-white md:-translate-x-1.5"
        />
        <div class="bg-blush/30 rounded-lg p-5">
          <span class="text-sm text-gold font-semibold">{{ ceremony.time }}</span>
          <h3 class="font-display text-xl text-charcoal mt-1">
            {{ localized(ceremony, 'title', locale) }}
          </h3>
          <p
            v-if="localized(ceremony, 'description', locale)"
            class="text-charcoal/70 mt-2"
          >
            {{ localized(ceremony, 'description', locale) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
