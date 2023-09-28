<template>
  <div class="container">
    <template v-if="appStore.isListening">
      <div
        :style="{ height: `${MAX_FREQUENCY_VALUE}px` }"
        class="visual-box"
      >
        <Suspense>
          <visualizer />
        </Suspense>

        <limiter />
      </div>

      <button
        :class="{ 'mute-button_muted': appStore.isMuted, 'mute-button_unmuted': !appStore.isMuted }"
        @click="appStore.toggleMute"
        class="mute-button"
      >
        <mute-icon v-if="appStore.isMuted" />
        <unmute-icon v-else />
      </button>
    </template>

    <button v-else @click="appStore.listen" class="start-button">Click to listen</button>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useAppStore } from '@/store/app';
import { MAX_FREQUENCY_VALUE } from '@/types/constants';
import Visualizer from '@/components/Visualizer.vue';
import Limiter from '@/components/Limiter.vue';
import MuteIcon from '@/assets/icons/mute.svg';
import UnmuteIcon from '@/assets/icons/unmute.svg';

const appStore = useAppStore();

watch(
  () => appStore.microphone?.frequencyData,
  () => {
    if (appStore.isLimitOver && !appStore.isMuted && !appStore.isThrottled) {
      appStore.isThrottled = true;

      appStore.play();

      setTimeout(() => appStore.isThrottled = false, 5000);
    }
  }
)
</script>