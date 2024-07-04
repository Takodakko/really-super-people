<script setup lang="ts">
  import { ref, Ref, computed } from 'vue';
  import imageList from '../imageList';
  import type { playerTypes, setNames } from '../App.d.ts';

  const displayName: Ref<string> = ref('');
  const type: Ref<playerTypes> = ref('rock');
  const maxHp: Ref<number> = ref(0);
  const str: Ref<number> = ref(0);
  const def: Ref<number> = ref(0);
  const acc: Ref<number> = ref(0);
  const guts: Ref<number> = ref(0);
  const luck: Ref<number> = ref(0);
  const rng: Ref<number> = ref(0);
  const name: Ref<setNames> = ref('crow');
  const src: Ref<string> = computed(() => {
    return `${imageList[name]}`;
  });

</script>

<template>
  <div class="character-view">
    <div><b>{{ displayName }}</b></div>
    <img class="image" :src="src"><br>
    <div><b>Type:</b> {{ type }} </div><br>
    <div><b>Max HP:</b> {{ maxHp }} | <b>Str:</b> {{ str }} </div><br>
    <div><b>Def:</b> {{ def }} |  <b>Acc:</b> {{ acc }}%</div><br>
  </div>

</template>

<style scoped>
.character-view {
    display: grid;
    gap: 5px;
    margin: 2em;
  }
  .image {
    max-height: 8em;
    max-width: 8em;
  }
</style>