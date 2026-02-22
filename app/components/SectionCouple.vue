<script setup lang="ts">
const { locale, t } = useI18n()
const { assetUrl } = useDirectus()

const props = defineProps<{
  settings: WeddingSettings
}>()

const groom = computed(() => ({
  name: localized(props.settings, 'groom_name', locale.value),
  bio: localized(props.settings, 'groom_bio', locale.value),
  parents: localized(props.settings, 'groom_parents', locale.value),
  photo: assetUrl(props.settings.groom_photo, { width: 400, height: 400 }),
}))

const bride = computed(() => ({
  name: localized(props.settings, 'bride_name', locale.value),
  bio: localized(props.settings, 'bride_bio', locale.value),
  parents: localized(props.settings, 'bride_parents', locale.value),
  photo: assetUrl(props.settings.bride_photo, { width: 400, height: 400 }),
}))
</script>

<template>
  <section class="py-20 px-4 bg-white">
    <h2 class="font-display text-3xl md:text-4xl text-center text-burgundy mb-16">
      {{ t('sections.couple') }}
    </h2>

    <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
      <div v-for="person in [groom, bride]" :key="person.name" class="text-center">
        <div class="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gold-light shadow-lg">
          <img
            :src="person.photo"
            :alt="person.name"
            class="w-full h-full object-cover"
          />
        </div>
        <h3 class="font-display text-2xl text-charcoal mb-2">
          {{ person.name }}
        </h3>
        <p v-if="person.parents" class="text-sm text-charcoal/60 mb-3">
          {{ t('parents.label') }}: {{ person.parents }}
        </p>
        <p class="text-charcoal/80 leading-relaxed">
          {{ person.bio }}
        </p>
      </div>
    </div>
  </section>
</template>
