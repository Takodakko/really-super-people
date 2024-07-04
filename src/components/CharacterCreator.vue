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
    return `${imageList[name.value]}`;
  });
  const totalPoints: Ref<number> = ref(100);
  const currentElement: Ref<number> = ref(0);

  //const statArray = ['maxHp', 'str', 'def', 'acc', 'guts', 'luck', 'rng'];
  const statObject = {
    maxHp: ['Max HP', maxHp, 2],
    str: ['Strength', str, 3],
    def: ['Defense', def, 4],
    acc: ['Accuracy', acc, 5],
    guts: ['Guts', guts, 6],
    luck: ['Luck', luck, 7],
    rng: ['Range', rng, 8],
  };

  function makeTextPretty(str: string) {
    str = str[0].toUpperCase() + str.slice(1);
    const index = str.indexOf('_');
    if (index !== -1) {
      const alsoCapitalize = str[index + 1].toUpperCase();
      str = str.slice(0, index) + ' ' + alsoCapitalize + str.slice(index + 2);
    }
    return str;
  };

  function nextStep() {
    currentElement.value += 1;
    if (currentElement.value > 9) {
      currentElement.value = 9;
    }
    console.log('next');
  };

  function previousStep() {
    currentElement.value -= 1;
    if (currentElement.value < 0) {
      currentElement.value = 0;
    }
    console.log('previous');
  };

  function createCharacter() {
    console.log('hi');
    console.log(name.value)
  };

</script>

<template>
  <div class="character-view">
    <div><button :disabled="currentElement < 1" @click="previousStep"><-Previous</button></div>
    <form @submit.prevent="createCharacter">
    <div v-if="currentElement === 0"><label for="new-display-name"><b>Name your fighter! </b><br></label> <input @keyup.enter="nextStep" v-model="displayName" name="new-display-name" type="text" id="new-display-name"/><br><button @click="nextStep">Next-></button></div>
    <img v-if="currentElement === 1" class="image" :src="src"><br>
    <div v-if="currentElement === 1"><label for="new-name"><b>Unit Image: </b></label><select v-model="name" name="new-name" id="new-name"><option value="crow">Crow</option><option value="blue_jay">Blue Jay</option></select><br><button @click="nextStep">Next-></button></div>
    <div v-for="(val, key) in statObject" :key="key">
      <div v-if="currentElement === val[2]"><label :for="'new-' + key"><b>{{ val[0] }}: </b></label><input :name="'new-' + key" :id="'new-' + key" v-model="val[1]" type="number"/><br><button @click="nextStep">Next-></button></div>
    </div><br>
    <div v-if="currentElement === 9"><label for="new-type"><b>Effective Type: </b></label><select v-model="type" name="new-type" id="new-type"><option>rock</option><option>scissors</option><option>paper</option></select><br><button @click="createCharacter">Create!</button> {{ type }} </div><br>
    
  </form>
  <div><b>Name:</b> {{ displayName }}</div>
  <div v-if="currentElement > 0">This unit is a {{ makeTextPretty(name) }}</div>
  <div v-if="currentElement > 1"><b>Max HP:</b> {{ maxHp }}</div>
  <div v-if="currentElement > 2"><b>Strength:</b> {{ str }}</div>
  <div v-if="currentElement > 3"><b>Defense:</b> {{ def }}</div>

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