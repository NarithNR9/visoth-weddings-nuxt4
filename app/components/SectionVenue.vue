<script setup lang="ts">
const { locale, t } = useI18n();

const props = defineProps<{
    settings: WeddingSettings;
}>();

const venueName = computed(() =>
    localized(props.settings, "venue_name", locale.value),
);
const venueAddress = computed(() =>
    localized(props.settings, "venue_address", locale.value),
);

const qrCodeUrl = computed(() => {
    if (!props.settings.venue_map_url) return "";
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(props.settings.venue_map_url)}`;
});
</script>

<template>
    <section class="py-16 px-4 bg-blush/30">
        <h2
            class="font-display text-2xl md:text-4xl text-center text-burgundy mb-8"
        >
            {{ t("sections.venue") }}
        </h2>

        <!-- Two venue cards -->
        <div class="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Ceremonies venue -->
            <div
                class="bg-white rounded-xl shadow-sm p-6 text-center space-y-4"
            >
                <h3
                    class="text-base md:text-lg text-gold-light"
                    style="font-family: var(--font-moulpali)"
                >
                    {{ t("venue.ceremonies") }}
                </h3>
                <p class="text-charcoal/80">{{ venueName }}</p>

                <!-- Parties venue -->
                <h3
                    class="text-base md:text-lg text-gold-light"
                    style="font-family: var(--font-moulpali)"
                >
                    {{ t("venue.parties") }}
                </h3>
                <p class="text-charcoal font-medium whitespace-pre-line">
                    {{ venueAddress }}
                </p>
                <div v-if="settings.venue_map_url" class="flex justify-center">
                    <img
                        :src="qrCodeUrl"
                        alt="Map QR Code"
                        class="w-44 h-44 rounded-lg border border-charcoal/10"
                    />
                </div>

                <a
                    v-if="settings.venue_map_url"
                    :href="settings.venue_map_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-block px-5 py-2 bg-gold text-white text-sm rounded-lg hover:bg-gold-light transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-4 h-4 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ t("venue.directions") }}
                </a>
            </div>

            <!-- Countdown -->
            <div class="mb-12">
                <CountdownTimer
                    :target-date="settings.wedding_date"
                    variant="gold"
                />
            </div>
        </div>
    </section>
</template>
