<template>
  <div class="visualizer">
    <div
      v-for="(frequency, index) in appStore.microphone?.frequencyData"
      :key="index"
      :style="{ height: `${frequency}px`, opacity: frequency * 0.008 }"
      :class="{ 'visualizer__frequency_danger': frequency >= appStore.limit }"
      class="visualizer__frequency"
    />
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
</script>