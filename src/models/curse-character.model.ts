import { ICurse } from "../interfaces/character.interface";
import { Character } from "./character.model";

export class CurseCharacter extends Character implements ICurse {
  type: 'curse' = 'curse';

  constructor(curse: ICurse) {
    super(curse);
  }

  toJSON(): ICurse {
    return {
      ...super.toJSON(),
      type: this.type,
    };
  }
}