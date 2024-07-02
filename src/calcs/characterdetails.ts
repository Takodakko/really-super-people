class CharacterDetails {
    constructor(name: string, type: string, str: number, def: number, acc: number) {
      this.name = name;
      this.type = type;
      this.str = str;
      this.def = def;
      this.acc = acc;
      this.attack = () => {
        console.log(`${this.name} attacked!`)
      }
      this.heal = () => {
        console.log(`${this.name} healed!`)
      }
    }
    name: string;
    type: string;
    str: number;
    def: number;
    acc: number;
    attack: Function;
    heal: Function;
}

export default CharacterDetails;