import { ISorcerer } from "../interfaces/character.interface";
import { Character } from "./character.model";

export class SorcererCharacter extends Character implements ISorcerer {
    type: 'sorcerer' = 'sorcerer';
  
    constructor(sorcerer: ISorcerer) {
      super(sorcerer);
    }
  
    toJSON(): ISorcerer {
      return {
        ...super.toJSON(),
        type: this.type,
      };
    }
  }