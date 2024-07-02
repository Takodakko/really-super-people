<script setup lang="ts">
  import Character from './components/Character.vue'
  import CharacterCreator from './components/CharacterCreator.vue';
  import MessageDisplay from './components/MessageDisplay.vue';
  import { ref, Ref, computed, watch } from 'vue';
  import type {CharacterStats, playerNumbers, BothCharacterStats, playerTypes} from './App.d.ts';
  
  const character1: CharacterStats = {
    name: 'crow',
    displayName: 'Crow',
    hp: 20,
    maxHp: 20,
    type: 'rock',
    str: 9,
    def: 7,
    acc: 75,
    luck: 10,
    guts: 5,
    rng: 2,
    whichPlayer: 'player1'
  };

  const character2: CharacterStats = {
    name: 'blue_jay',
    displayName: 'Blue Jay',
    hp: 16,
    maxHp: 16,
    type: 'paper',
    str: 10,
    def: 5,
    acc: 85,
    luck: 20,
    guts: 5,
    rng: 2,
    whichPlayer: 'player2'
  };
  
  const bothCharacterStats: Ref<BothCharacterStats> = ref({
    'player1': {...character1},
    'player2': {...character2},
  });

  const gameOver = ref(false);
  const player1Turn = ref(true);
  const player2Turn = computed(() => !player1Turn.value);

  watch(() => bothCharacterStats.value.player1.hp, (player1hp) => {
    if (player1hp <= 0) {
      flashMessage(`${bothCharacterStats.value.player1.displayName} is defeated!`);
      flashMessage(`${bothCharacterStats.value.player1.displayName} loses!`);
      flashMessage(`Too bad for ${bothCharacterStats.value.player1.displayName}!`);
      gameOver.value = true;
    }
  });
  
  watch(() => bothCharacterStats.value.player2.hp, (player2hp) => {
    if (player2hp <= 0) {
      flashMessage(`${bothCharacterStats.value.player2.displayName} is defeated!`);
      flashMessage(`${bothCharacterStats.value.player2.displayName} loses!`);
      flashMessage(`Too bad for ${bothCharacterStats.value.player2.displayName}!`);
      gameOver.value = true;
    }
  });

  const creationView = ref(true);

  function calculateAdvantage(one: playerTypes, two: playerTypes): boolean | null {
    if (one === 'rock') {
      switch(two) {
        case 'rock':
          return null;
        case 'scissors':
          return true;
        case 'paper':
          return false;
      }
    } else if (one === 'scissors') {
      switch(two) {
        case 'rock':
          return false;
        case 'scissors':
          return null;
        case 'paper':
          return true;
      }
    } else {
      switch(two) {
        case 'rock':
          return true;
        case 'scissors':
          return false;
        case 'paper':
          return null;
      }
    }
  }

  function calculateAttack(attackerNumber: playerNumbers) {
    const attacker = {...bothCharacterStats.value[attackerNumber]};
    const defender = attackerNumber === 'player1' ? {...bothCharacterStats.value.player2} : {...bothCharacterStats.value.player1};
    const player1isAttacker = attackerNumber === 'player1';
    const random = Math.random() * 100 < attacker.luck;
    const rsp: boolean | null = calculateAdvantage(attacker.type, defender.type);
    const bonus = random ? 10 : 0;
    let advantage = 0;
    if (rsp === true) {
      advantage = 5;
    } else if (rsp === false) {
      advantage = -5;
    }
    const hit = attacker.acc > Math.random() * 100;
    const attackAmount = attacker.str - defender.def + bonus + advantage >= 0 ? attacker.str - defender.def + bonus + advantage : 0;
    if (hit) {
      flashMessage(`Hit for ${attackAmount} damage!`);
      defender.hp = defender.hp - attackAmount;
    } else {
      flashMessage('Missed!');
      return;
    }
    if (player1isAttacker) {
      bothCharacterStats.value.player2 = {...defender};
    } else {
      bothCharacterStats.value.player1 = {...defender};
    }
  };

  function calculateHeal(healerNumber: playerNumbers) {
    const currentPlayer = {...bothCharacterStats.value[healerNumber]};
    const random = Math.random() * 100 < currentPlayer.luck;
    const bonus = random ? Math.floor((currentPlayer.guts + currentPlayer.luck) / 2) : 0;
    currentPlayer.hp = currentPlayer.hp + Math.floor(bonus + ((currentPlayer.def + currentPlayer.str) / 2));
    if (currentPlayer.hp > currentPlayer.maxHp) {
      currentPlayer.hp = currentPlayer.maxHp;
    }
    bothCharacterStats.value[healerNumber] = {...currentPlayer};
  }

  const msg = ref('...');
  
  const messageQueue: Ref<string[]> = ref([]);
  let timer = 0;

  watch(() => messageQueue.value.length, () => {
      clearTimeout(timer);
      if (messageQueue.value.length !== 0) {
        msg.value = messageQueue.value[0];
        timer = setTimeout(() => {
        // msg.value = messageQueue.value[0];
        messageQueue.value.shift();
      }, 600);
      }    
    setTimeout(() => {
      msg.value = '...';
    }, 1200);
  });

  
  function flashMessage(message: string) {
    messageQueue.value.push(message);
  }

  function actionTaken(type: string, emitName: string, whichOne: playerNumbers) {
    if (whichOne === 'player1') {
      player1Turn.value = false;
    } else if (whichOne === 'player2') {
      player1Turn.value = true;
    }
    if (type === 'attack') {
      flashMessage(`${emitName} attacked!`);
      calculateAttack(whichOne);
    } else if (type === 'heal') {
      flashMessage(`${emitName} healed!`);
      calculateHeal(whichOne);
    }
  }
</script>

<template>
  
  <div class="character-match">
    <Character :stats="bothCharacterStats.player1" :can-click="!gameOver && player1Turn" @attack="(actionType: string, displayName: string) => actionTaken(actionType, displayName, 'player1')" @heal="(actionType: string, displayName: string) => actionTaken(actionType, displayName, 'player1')"/><br>
    <Character :stats="bothCharacterStats.player2" :can-click="!gameOver && player2Turn" @attack="(actionType: string, displayName: string) => actionTaken(actionType, displayName, 'player2')" @heal="(actionType: string, displayName: string) => actionTaken(actionType, displayName, 'player2')"/><br>
  </div>
  
  <MessageDisplay :msg="msg" /><br>
    
  <CharacterCreator v-if="creationView"/>
</template>

<style scoped>
  .character-match {
    display: flex;
    flex-direction: row;
  }
</style>
