<script setup lang="ts">
  import { ref, Ref, computed, ComputedRef } from 'vue';
  import imageList from '../imageList';
  import type { playerTypes, setNames } from '../App.d.ts';

  const emit = defineEmits(['create-character']);

  const displayName: Ref<string> = ref('');
  const type: Ref<playerTypes> = ref('rock');
  const maxHp: Ref<number> = ref(1);
  const str: Ref<number> = ref(1);
  const def: Ref<number> = ref(1);
  const acc: Ref<number> = ref(1);
  const guts: Ref<number> = ref(1);
  const luck: Ref<number> = ref(1);
  const rng: Ref<number> = ref(1);
  const name: Ref<setNames> = ref('crow');
  const src: Ref<string> = computed(() => {
    return `${imageList[name.value]}`;
  });

  const totalPoints = computed(() => {
    return 100 - pointsUsedList.value.reduce((a, b) => {
      return a + b;
    });
  });

  const pointsUsedList: Ref<number[]> = ref([0]);
  const currentElement: Ref<number> = ref(0);

  const statArray: ComputedRef<Array<[string, Ref<string>, number] | [string, Ref<number>, number]>> = computed(() => {
    return ([
      ['Character Name: ', displayName, 0],
      ['This character is a: ', makeTextPretty, 1],
      ['Max HP: ', maxHp, 2], 
      ['Strength: ', str, 3], 
      ['Defense: ', def, 4], 
      ['Accuracy: ', acc, 5], 
      ['Guts: ', guts, 6], 
      ['Luck: ', luck, 7], 
      ['Range: ', rng, 8],
    ])
  });

  const statObject: ComputedRef<Record<string, [string, Ref<number>, number]>> = computed(() => {
    return ({
    maxHp: ['Max HP', maxHp, 2],
    str: ['Strength', str, 3],
    def: ['Defense', def, 4],
    acc: ['Accuracy', acc, 5],
    guts: ['Guts', guts, 6],
    luck: ['Luck', luck, 7],
    rng: ['Range', rng, 8],
  })
  });

  const makeTextPretty = computed(() => {
    let prettyName = name.value[0].toUpperCase() + name.value.slice(1);
    const index = name.value.indexOf('_');
    if (index !== -1) {
      const alsoCapitalize = name.value[index + 1].toUpperCase();
      prettyName = name.value.slice(0, index) + ' ' + alsoCapitalize + name.value.slice(index + 2);
    }
    return prettyName;
  });

  const highlightTextInput = ref('');

  function nextStep(chosenAmount: number, str: string) {
    console.log(chosenAmount, 'chosen Amount')
      if (str.length < 1 && chosenAmount === 0) {
        highlightTextInput.value = 'highlight-text-input'
        return;
      }
      highlightTextInput.value = '';
        pointsUsedList.value.push(chosenAmount);
      
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
    } else {
      pointsUsedList.value.pop();
    }
    console.log('previous');
  };

  function createCharacter() {
    console.log('hi');
    console.log(name.value)
    const newCharacter = {
      displayName: displayName.value,
      name: name.value,
      maxHp: maxHp.value,
      hp: maxHp.value,
      str: str.value,
      def: def.value,
      acc: acc.value,
      luck: luck.value,
      guts: guts.value,
      type: type.value,
      rng: rng.value
    };
    emit('create-character', newCharacter);
  };

</script>

<template>
  {{ pointsUsedList }}
  <div class="character-view">
    <div>Total Points: {{ totalPoints }}</div>
    <div>
      <button :disabled="currentElement < 1" @click="previousStep">
        <-Previous
      </button>
    </div>
    <div><img class="image" :src="src"></div><br>
    <form @submit.prevent="createCharacter">
      <div v-if="currentElement === 0">
        <label for="new-display-name">
          <b>Choose a name! </b>
        </label>
        <input :class="highlightTextInput" @keyup.enter="nextStep(0, displayName)" v-model="displayName" name="new-display-name" type="text" id="new-display-name"/>
        <div :style="highlightTextInput === 'highlight-text-input' ? {color: 'red'} : {}">{{ highlightTextInput === 'highlight-text-input' ? 'Please enter a name' : '' }}</div><br>
          <button @click="nextStep(0, displayName)">
            Next->
          </button>
      </div>
      <div v-if="currentElement === 1">
        <label for="new-name">
          <b>Unit Image: </b>
        </label>
        <select @keyup.enter="nextStep(0, name)" @keyup.left="previousStep" v-model="name" name="new-name" id="new-name">
          <option value="crow">Crow</option>
          <option value="blue_jay">Blue Jay</option>
        </select><br>
        <button @click="nextStep(0, name)">
          Next->
        </button>
      </div>
      <div v-for="(val, key) in statObject" :key="key">
        <div v-if="currentElement === val[2]">
          <label :for="'new-' + key">
            <b>{{ val[0] }}: </b>
          </label>
          <input @keyup.enter="nextStep(val[1].value, '')" @keyup.left="previousStep" :name="'new-' + key" :id="'new-' + key" v-model="val[1].value" type="number"/><br>
          <button @click="nextStep(val[1].value, '')">
            Next->
          </button>
        </div>
      </div><br>
      <div v-if="currentElement === 9">
        <label for="new-type">
          <b>Effective Type: </b>
        </label>
        <select @keyup.enter.prevent="createCharacter" @keyup.left="previousStep" v-model="type" name="new-type" id="new-type">
          <option>rock</option>
          <option>scissors</option>
          <option>paper</option>
        </select><br>
        <button @click.prevent="createCharacter">
          Create!
        </button>
         {{ type }} 
      </div><br>
    
    </form>
    <div v-for="stat in statArray">{{ stat[0] }}
      <b>{{ currentElement >= stat[2] ? stat[1].value : '' }}</b>
    </div>
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
  .highlight-text-input {
    border-style: solid;
    border-color: red;
  }
</style>