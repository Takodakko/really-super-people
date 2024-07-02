<script setup lang="ts">
import { computed } from 'vue'
import imageList from '../imageList';
import type {CharacterStats} from '../App.d.ts';

const props = defineProps<{stats: CharacterStats, canClick: boolean }>();
const { name, maxHp, str, def, acc, type } = props.stats;
const hp = computed(() => {
  return props.stats.hp > -1 ? props.stats.hp : 0;
});

const displayName = computed(() => props.stats.displayName);

const canClick = computed(() => props.canClick);

const emit = defineEmits(['attack', 'heal']);

const attack = function() {
  console.log(`${displayName.value} attacked!`)
  emit('attack', 'attack', displayName.value);
};

const heal = function() {
  console.log(`${displayName.value} healed!`);
  emit('heal', 'heal', displayName.value);
};

const src = `${imageList[name]}`;

</script>

<template>
  <div class="character-view">
    <div><b>{{ displayName }}</b></div>
    <img class="image" :src="src"><br>
    <div><b>Type:</b> {{ type }} </div><br>
    <div><b>HP:</b> {{ hp }} / {{ maxHp }} | <b>Str:</b> {{ str }} </div><br>
    <div><b>Def:</b> {{ def }} |  <b>Acc:</b> {{ acc }}%</div><br>
    <span>
      <button :disabled="!canClick" @click="attack">Attack</button>
      <button :disabled="!canClick" @click="heal">Heal</button>
    </span>
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
