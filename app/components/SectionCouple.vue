<script setup lang="ts">
const { locale, t } = useI18n();
const { assetUrl } = useDirectus();

const props = defineProps<{
    settings: WeddingSettings;
}>();

const groom = computed(() => ({
    name: localized(props.settings, "groom_name", locale.value),
    bio: localized(props.settings, "groom_bio", locale.value),
    parents: localized(props.settings, "groom_parents", locale.value),
    photo: assetUrl(props.settings.groom_photo, { width: 400, height: 400 }),
}));

const bride = computed(() => ({
    name: localized(props.settings, "bride_name", locale.value),
    bio: localized(props.settings, "bride_bio", locale.value),
    parents: localized(props.settings, "bride_parents", locale.value),
    photo: assetUrl(props.settings.bride_photo, { width: 400, height: 400 }),
}));
</script>

<template>
    <section class="py-16 px-4 bg-white" data-aos="fade-up">
        <h2
            class="font-display text-3xl md:text-4xl text-center text-burgundy mb-12"
        >
            {{ t("sections.couple") }}
        </h2>

        <div
            class="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:gap-8"
        >
            <!-- Groom -->
            <div class="text-center md:flex-1">
                <div
                    class="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gold-light shadow-lg"
                >
                    <img
                        :src="groom.photo"
                        :alt="groom.name"
                        class="w-full h-full object-cover"
                    />
                </div>
                <h3 class="font-display text-2xl text-charcoal mb-2">
                    {{ groom.name }}
                </h3>
                <p v-if="groom.parents" class="text-sm text-charcoal/60 mb-3">
                    {{ t("parents.groom") }} {{ groom.parents }}
                </p>
                <p class="text-charcoal/80 leading-relaxed">
                    {{ groom.bio }}
                </p>
            </div>

            <!-- Connector -->
            <div class="text-center my-10 md:my-0 shrink-0">
                <span
                    class="text-2xl md:text-3xl text-gold"
                    style="font-family: var(--font-fasthand)"
                >
                    {{ t("couple.connector") }}
                </span>
            </div>

            <!-- Bride -->
            <div class="text-center md:flex-1">
                <div
                    class="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gold-light shadow-lg"
                >
                    <img
                        :src="bride.photo"
                        :alt="bride.name"
                        class="w-full h-full object-cover"
                    />
                </div>
                <h3 class="font-display text-2xl text-charcoal mb-2">
                    {{ bride.name }}
                </h3>
                <p v-if="bride.parents" class="text-sm text-charcoal/60 mb-3">
                    {{ t("parents.bride") }} {{ bride.parents }}
                </p>
                <p class="text-charcoal/80 leading-relaxed">
                    {{ bride.bio }}
                </p>
            </div>
        </div>
    </section>
</template>
