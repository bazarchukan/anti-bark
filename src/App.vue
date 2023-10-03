<template>
  <div class="container">
    <template v-if="appStore.isListening">
      <div :style="{ height: `${MAX_FREQUENCY_VALUE}px` }" class="visual-box">
        <visualizer />

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

      <ui-kit-select
        :model-value="appStore.sound"
        :options="soundOptions"
        @update:model-value="appStore.changeSound"
      />
    </template>

    <button v-else @click="appStore.start" class="start-button">Click to start</button>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';
import { MAX_FREQUENCY_VALUE, SOUNDS } from '@/types/constants';
import Visualizer from '@/components/Visualizer.vue';
import Limiter from '@/components/Limiter.vue';
import UiKitSelect from '@/components/UiKit/UiKitSelect.vue';
import MuteIcon from '@/assets/icons/mute.svg';
import UnmuteIcon from '@/assets/icons/unmute.svg';

const appStore = useAppStore();

const soundOptions = SOUNDS.map(sound => ({ title: sound, value: sound }))
</script>