<template>
  <div class="ui-kit-select">
    <select @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :selected="option.value === modelValue"
      >
        {{ option.title }}
      </option>
    </select>
  </div>  
</template>
   
<script setup lang="ts">
import { Option } from '@/types/uiKit';

defineEmits(['update:modelValue']);

interface Props {
  label?: string,
  modelValue: string | number | null,
  options: Option[]
}

defineProps<Props>();
</script>