<template>
  <div
    :style="{ bottom: `${appStore.limit}px` }"
    @mousedown="startMoveLimiter"
    class="limiter"
  />
</template>

<script setup lang="ts">
import { MAX_FREQUENCY_VALUE, MIN_FREQUENCY_VALUE } from '@/types/constants';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();

const startMoveLimiter = () => {
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', stopMoveLimiter);
}

const stopMoveLimiter = () => {
  document.removeEventListener('mousemove', onMove);
}

const onMove = (event: any) => {
  const visualBox = document.querySelector('.visual-box') as HTMLElement; 

  const newLimit = visualBox.offsetHeight + visualBox.offsetTop - event.pageY;  

  if (newLimit < MIN_FREQUENCY_VALUE || newLimit > MAX_FREQUENCY_VALUE) {
    return;
  }

  appStore.limit = newLimit;
}
</script>