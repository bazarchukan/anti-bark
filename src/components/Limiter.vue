<template>
  <div
    :style="{ bottom: `${appStore.limit}px` }"
    @mousedown="startMouseMove"
    @touchmove="onMove"
    class="limiter"
  />
</template>

<script setup lang="ts">
import { MAX_FREQUENCY_VALUE, MIN_FREQUENCY_VALUE } from '@/types/constants';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();

const startMouseMove = () => {
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', stopMouseMove);
}

const stopMouseMove = () => {
  document.removeEventListener('mousemove', onMove);
}

const onMove = (event: MouseEvent | TouchEvent) => {
  let y: number;

  if (event instanceof MouseEvent) {
    y = event.pageY;
  }
  
  if (event instanceof TouchEvent) {
    y = event.touches[0].pageY;
  }
  
  const visualBox = document.querySelector('.visual-box') as HTMLElement; 

  const newLimit = visualBox.offsetHeight + visualBox.offsetTop - y;  

  if (newLimit < MIN_FREQUENCY_VALUE || newLimit > MAX_FREQUENCY_VALUE) {
    return;
  }

  appStore.limit = newLimit;
}
</script>