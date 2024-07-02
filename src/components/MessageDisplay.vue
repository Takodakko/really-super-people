<script setup lang="ts">
  import { computed } from 'vue';
  const props = defineProps<{msg: string}>();
  const msg = computed(() => props.msg);

</script>

<template>
  
  <div> {{ msg }} </div>
    
</template>