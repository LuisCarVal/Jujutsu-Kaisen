import { UUID } from "../types/common.type";
import { ICharacter, ICurse, ISorcerer } from "../interfaces/character.interface";

export class JujutsuKaisen {
    #sorcerers: Map<UUID, ISorcerer> = new Map();
    #curses: Map<UUID, ICurse> = new Map();

    add(character: ICurse | ISorcerer): void {
      character.type === "curse" 
          ? this.#curses.set(character.id, character as ICurse)
          : this.#sorcerers.set(character.id, character as ISorcerer);
    }
    remove(id: UUID): void {
      const type= this.#curses.has(id) ? this.#curses : this.#sorcerers;
      type.delete(id);
    }

    update(id: UUID, character: ICurse | ISorcerer): ICharacter {
      character.type === "curse"
          ? this.#curses.set(id, character as ICurse)
          : this.#sorcerers.set(id, character as ISorcerer);
      return character;
  }
    findById(id: UUID): ICurse | ISorcerer | undefined {
        return this.#curses.get(id) || this.#sorcerers.get(id);
    }

    /* findAll(): Map<UUID, ICharacter> {
      return new Map<UUID, ICharacter>([
          ...Array.from(this.#curses.entries()) as [UUID, ICharacter][],
          ...Array.from(this.#sorcerers.entries()) as [UUID, ICharacter][]
      ]);
  } */
  

    findAllCurses(): ICurse[] {
        return Array.from(this.#curses.values());
    }

    findAllSorcerers(): ISorcerer[] {
        return Array.from(this.#sorcerers.values());
    }

    get sorcerers(): Map<UUID, ISorcerer> {
        return this.#sorcerers;
    }

    get curses(): Map<UUID, ICurse> {
        return this.#curses;
    }
}
