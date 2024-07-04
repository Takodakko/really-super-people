interface CharacterStats {
    name: setNames;
    displayName: string;
    maxHp: number;
    hp: number;
    type : playerTypes;
    str: number;
    def: number;
    acc: number;
    luck: number;
    guts: number;
    rng: number;
    whichPlayer: playerNumbers;
  }

  type playerNumbers = 'player1' | 'player2';

  type playerTypes = 'rock' | 'scissors' | 'paper';

  type BothCharacterStats = Record<playerNumbers, CharacterStats>

  type setNames = 'crow' | 'blue_jay';

  export {
    CharacterStats,
    playerNumbers,
    BothCharacterStats,
    playerTypes,
    setNames,
  }