interface CharacterStats {
    name: string;
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

  export {
    CharacterStats,
    playerNumbers,
    BothCharacterStats,
    playerTypes,
  }