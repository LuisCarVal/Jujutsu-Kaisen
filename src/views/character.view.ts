import { ICharacter } from "../interfaces/character.interface";
import { UUID } from "../types/common.type";

export abstract class CharacterView {
    abstract remove(id: UUID): void;
    abstract show(characters: ICharacter[] , callbackRemove, callbackUpdate): void;
    abstract create(character: ICharacter, callbackRemove, callbackUpdate): void
    abstract update(character: ICharacter,callbackRemove, callbackUpdate): void;
    isConfirmDelete(): boolean {
        return confirm('¿Quieres borrar el objeto?');
    }
}