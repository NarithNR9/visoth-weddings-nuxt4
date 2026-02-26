<script setup lang="ts">
const { locale, t } = useI18n();

const props = defineProps<{
    settings: WeddingSettings;
}>();

const welcoming = computed(() =>
    localized(props.settings, "welcoming", locale.value),
);
</script>

<template>
    <section class="py-12 px-4 bg-blush/30" data-aos="fade-up">
        <!-- Top ornament -->
        <div class="flex items-center justify-center mb-10">
            <div class="h-px flex-1 max-w-24 bg-charcoal/30" />
            <svg
                class="mx-3 w-10 h-10 text-charcoal/50"
                viewBox="0 0 100 80"
                fill="currentColor"
            >
                <path
                    d="M50 80 L35 60 C15 30, 0 15, 25 5 C40 0, 48 10, 50 20 C52 10, 60 0, 75 5 C100 15, 85 30, 65 60 Z"
                />
            </svg>
            <div class="h-px flex-1 max-w-24 bg-charcoal/30" />
        </div>

        <!-- Title -->
        <h2
            class="font-display text-2xl md:text-3xl text-center text-burgundy mb-8"
        >
            {{ t("sections.welcoming") }}
        </h2>

        <!-- Welcoming message -->
        <div class="max-w-2xl mx-auto text-center">
            <p
                class="text-base md:text-lg text-charcoal/80 leading-relaxed whitespace-pre-line"
            >
                {{ welcoming }}
            </p>
        </div>

        <!-- Bottom ornament (reversed heart) -->
        <div class="flex items-center justify-center mt-10">
            <div class="h-px flex-1 max-w-24 bg-charcoal/30" />
            <svg
                class="mx-3 w-10 h-10 text-charcoal/50 rotate-180"
                viewBox="0 0 100 80"
                fill="currentColor"
            >
                <path
                    d="M50 80 L35 60 C15 30, 0 15, 25 5 C40 0, 48 10, 50 20 C52 10, 60 0, 75 5 C100 15, 85 30, 65 60 Z"
                />
            </svg>
            <div class="h-px flex-1 max-w-24 bg-charcoal/30" />
        </div>
    </section>
</template>
